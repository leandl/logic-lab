import { ROUTE } from ".";

function rp(route: string, params: Record<string, string>) {
  return Object.entries(params).reduce(
    (acc, [keyParam, valueParam]) => acc.replace(keyParam, valueParam),
    route
  );
}
export const DYNAMIC_ROUTE = {
  API: {},
  APP: {
    QUESTION: {
      UPDATE: (questionId: number) =>
        rp(ROUTE.APP.QUESTION.UPDATE, {
          ":questionId": String(questionId),
        }),
    },
    EDITOR: (roomId: number, questionId: number) =>
      rp(ROUTE.APP.EDITOR, {
        ":roomId": String(roomId),
        ":questionId": String(questionId),
      }),
    USER: {
      DATA: {
        SHOW: (userId: number) =>
          rp(ROUTE.APP.USER.DATA.SHOW, {
            ":userId": String(userId),
          }),
      },
    },
  },
};
