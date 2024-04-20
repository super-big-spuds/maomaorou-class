import * as crypto from "crypto";
import * as Aes from "aes-js";

export type ISendPaymentRequestToNewebParameter = {
  paymentId: number;
  courses: {
    courseId: number;
    name: string;
    price: number;
  }[];
};

export type INewebPayReturnCallbackBody = {
  Status: string;
  MerchantID: string;
  Version: string;
  TradeInfo: string;
  TradeSha: string;
};

type ITradeInfo = {
  MerchantID: string;
  RespondType: string;
  TimeStamp: string;
  Version: string;
  MerchantOrderNo: string;
  Amt: string;
  ItemDesc: string;
  ReturnURL: string;
  NotifyURL: string;
};

type IDescryptResponse = {
  Status: string;
  Message: string;
  Result: {
    MerchantID: string;
    Amt: number;
    TradeNo: string;
    MerchantOrderNo: string;
    RespondType: string;
    IP: string;
    EscrowBank: string;
    PaymentType: string;
    PayTime: string;
    PayerAccount5Code: string;
    PayBankCode: string;
  };
};

export class NewebPaymentService {
  readonly newebPaymentURL = process.env.NEWEB_PAYMENT_URL;
  readonly newebMerchantId = process.env.NEWEB_MERCHANT_ID;
  readonly newebHashKey = process.env.NEWEB_HASH_KEY;
  readonly newebHashIv = process.env.NEWEB_HASH_IV;

  readonly frontendURL = process.env.DOMAIN_URL;
  readonly backendURL = process.env.DOMAIN_URL_BK;

  constructor() {}

  private padding = (text: string) => {
    const len = text.length;
    const pad = 32 - (len % 32);
    text += String.fromCharCode(pad).repeat(pad);
    return text;
  };

  private getQueryString = (data: Record<string, string>) => {
    return Object.entries(data).reduce(
      (acc, [key, value]) => `${acc}${key}=${value}&`,
      ""
    );
  };

  // tradeInfoString
  private createSesDescrypt(data: string) {
    const decrypt = crypto.createDecipheriv(
      "aes256",
      this.newebHashKey,
      this.newebHashIv
    );
    decrypt.setAutoPadding(false);
    const text = decrypt.update(data, "hex", "utf8");
    const plainText = text + decrypt.final("utf8");
    const result = plainText.replace(/[\x00-\x20]+/g, "");
    return JSON.parse(result) as IDescryptResponse;
  }

  // tradeInfoString
  private createShaEncrypt(data: string) {
    const sha = crypto.createHash("sha256");
    const plainText = `HashKey=${this.newebHashKey}&${data}&HashIV=${this.newebHashIv}`;

    return sha.update(plainText).digest("hex").toUpperCase();
  }

  async getPaymentUrl(data: ISendPaymentRequestToNewebParameter) {
    const price = data.courses.reduce((acc, course) => acc + course.price, 0);

    const cbc = new Aes.ModeOfOperation.cbc(
      Buffer.from(this.newebHashKey),
      Buffer.from(this.newebHashIv)
    );

    const tradeInfo: ITradeInfo = {
      MerchantID: this.newebMerchantId,
      RespondType: "JSON",
      TimeStamp: Date.now().toString(),
      Version: "2.0",
      MerchantOrderNo: data.paymentId.toString(),
      Amt: price.toString(),
      ItemDesc: "Maomaorou-class",
      ReturnURL: `${this.frontendURL}/order/${data.paymentId}`,
      NotifyURL: `${this.backendURL}/api/order/neweb-pay-notify-callback`,
    };
    const tradeInfoQueryString = this.getQueryString(tradeInfo);

    const cryptedTradeInfo = Aes.utils.hex.fromBytes(
      cbc.encrypt(Aes.utils.utf8.toBytes(this.padding(tradeInfoQueryString)))
    );

    const rawTradeShahashs = `HashKey=${this.newebHashKey}&${cryptedTradeInfo}&HashIV=${this.newebHashIv}`;
    const cryptedTradeSha = crypto
      .createHash("sha256")
      .update(rawTradeShahashs)
      .digest("hex")
      .toUpperCase();
    const returnBody = new URLSearchParams({
      MerchantID: this.newebMerchantId,
      TradeInfo: cryptedTradeInfo,
      TradeSha: cryptedTradeSha,
      Version: "2.0",
    });

    return `${this.newebPaymentURL}&${returnBody.toString()}`;
  }

  async refundTransactionPayment(tradeNo: string, amount: number) {
    const cbc = new Aes.ModeOfOperation.cbc(
      Buffer.from(this.newebHashKey),
      Buffer.from(this.newebHashIv)
    );
    const postData = {
      RespondType: "JSON",
      Version: "1.1",
      Amt: amount.toString(),
      TimeStamp: Date.now().toString(),
      IndexType: "2",
      TradeNo: tradeNo,
      CloseType: "2",
    };
    const postDataQueryString = this.getQueryString(postData);
    const cryptedPostData = Aes.utils.hex.fromBytes(
      cbc.encrypt(Aes.utils.utf8.toBytes(this.padding(postDataQueryString)))
    );

    const res = await fetch(`${this.newebPaymentURL}/API/CreditCard/Cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        MerchantID: this.newebMerchantId,
        PostData_: cryptedPostData,
      }).toString(),
    });

    const result = await res.json();
  }

  async cancelTransaction(tradeNo: string, amount: number) {
    const cbc = new Aes.ModeOfOperation.cbc(
      Buffer.from(this.newebHashKey),
      Buffer.from(this.newebHashIv)
    );
    const postData = {
      RespondType: "JSON",
      Version: "1.1",
      TimeStamp: Date.now().toString(),
      IndexType: "2",
      TradeNo: tradeNo,
      CloseType: "1",
      Cancel: "1",
      Amt: amount.toString(),
    };
    const postDataQueryString = this.getQueryString(postData);
    const cryptedPostData = Aes.utils.hex.fromBytes(
      cbc.encrypt(Aes.utils.utf8.toBytes(this.padding(postDataQueryString)))
    );

    const res = await fetch(`${this.newebPaymentURL}/API/CreditCard/Close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        MerchantID: this.newebMerchantId,
        PostData_: cryptedPostData,
      }).toString(),
    });

    const result = (await res.json()) as { Status: string };

    if (result.Status !== "SUCCESS") {
      throw new Error("Cancel failed");
    }
  }

  confirmOrderPayment(
    cryptedTradeInfoString: string,
    cryptedTradeShaString: string
  ) {
    const decodedInfo = this.createSesDescrypt(cryptedTradeInfoString);
    if (decodedInfo.Status !== "SUCCESS") {
      throw new Error("Payment failed");
    }
    const thisShaEncrypt = this.createShaEncrypt(cryptedTradeInfoString);
    if (thisShaEncrypt !== cryptedTradeShaString) {
      throw new Error("Invalid TradeSha");
    }

    return decodedInfo;
  }
}
