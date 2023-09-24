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
    QUESTION: (roomId: number, questionId: number) =>
      rp(ROUTE.APP.QUESTION, {
        ":roomId": String(roomId),
        ":questionId": String(questionId),
      }),
  },
};
