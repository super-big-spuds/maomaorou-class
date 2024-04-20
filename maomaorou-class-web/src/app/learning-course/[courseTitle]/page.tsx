import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
const data = {
  courseByTitle: {
    data: {
      id: "1",
      attributes: {
        title: "線上影音課程",
        goal: "學習線上影音課程",
        description: "這是一個線上影音課程",
        price: 1000,
        durationDay: 30,
        chapters: {
          data: [
            {
              id: "1",
              attributes: {
                name: "第一章",
                sequence: 1,
                lessons: {
                  data: [
                    {
                      id: "1",
                      attributes: {
                        name: "第一節",
                        sequence: 1,
                        content: {
                          isVideo: true,
                          url: "https://www.youtube.com/embed/1",
                        },
                      },
                    },
                    {
                      id: "2",
                      attributes: {
                        name: "第二節",
                        sequence: 2,
                        content: {
                          isVideo: false,
                          content: "這是一個文字內容",
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              id: "2",
              attributes: {
                name: "第二章",
                sequence: 2,
                lessons: {
                  data: [
                    {
                      id: "3",
                      attributes: {
                        name: "第一節",
                        sequence: 1,
                        content: {
                          isVideo: false,
                          content: "這是一個文字內容",
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        image: {
          data: {
            id: "1",
            attributes: {
              url: "https://via.placeholder.com/150",
            },
          },
        },
      },
    },
  },
};
export default function LearningCoursePage() {
  return (
    <div className="flex justify-center h-full items-center w-full m-4">
      <Card className="flex flex-col px-10 py-5 gap-6 w-full max-w-3xl">
        <p className="text-3xl font-semibold mx-auto">課程名稱</p>
        <img
          src="https://via.placeholder.com/150"
          className=" min-w-[200px] w-1/2 h-1/2 mx-auto"
        />

        <p className=" text-2xl font-bold">關於此課程</p>

        <p>{"TODO 放入內容"}</p>
        <p className=" text-2xl font-bold ">你將會學到什麼?</p>
        <p>{"TODO 放入內容"}</p>

        <p className=" text-2xl font-bold">課程大綱</p>
        <p>{"TODO 放入內容"}</p>
        <Accordion type="multiple">
          {data.courseByTitle.data.attributes.chapters.data.map((chapter) => (
            <AccordionItem
              value={chapter.id}
              className="　border border-gray-300 rounded-xl mb-1 "
              key={chapter.id}
            >
              <AccordionTrigger className=" border-3 border-gray-800 rounded-xl px-5  font-bold ">
                課程 {chapter.attributes.sequence}：{chapter.attributes.name}
              </AccordionTrigger>
              <AccordionContent>
                {chapter.attributes.lessons.data.length > 0 ? (
                  chapter.attributes.lessons.data.map((lesson) => (
                    <div key={lesson.id} className=" px-5 py-2.5 mx-2 border  ">
                      <p>
                        章節 {lesson.attributes.sequence}：
                        {lesson.attributes.name}1
                      </p>
                      {lesson.attributes.content.isVideo ? (
                        <iframe
                          src="https://www.youtube.com/embed/1"
                          className=" mx-auto"
                        />
                      ) : (
                        <p>課程內容</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className=" px-5 py-2.5 mx-2 ">無章節</div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
