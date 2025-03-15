import { gql } from "@/__generated__";

export const GET_USER_COURSE_STATUS_QUERY = gql(`
  query getUserCourseStatus($courseId: ID!) {
    course(id: $courseId) {
      data {
        attributes {
          withUserStatus {
            data {
              attributes {
                expiredAt
              }
            }
          }
        }
      }
    }
  }
  `);
