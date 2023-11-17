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
    USER: {
      DATA: {
        LIST: "/data-user/list",
        SHOW: "/data-user/show/:userId"
      }
    }
  },
};
