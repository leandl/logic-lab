export const ROUTE = {
  API: {},
  APP: {
    HOME: "/home",
    AUTH: {
      REGISTER: "/auth/register",
      LOGIN: "/auth/login",
    },
    QUESTION: {
      LIST: "/question/list",
      CREATE: "/question/create",
      UPDATE: "/question/update/:questionId",
    },
    EDITOR: "/editor/:roomId/:questionId",
  },
};

const routePrivateForSupervisor = [
  ROUTE.APP.QUESTION.LIST,
  ROUTE.APP.QUESTION.CREATE,
  ROUTE.APP.QUESTION.UPDATE,
];
