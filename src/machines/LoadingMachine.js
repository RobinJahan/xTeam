import { assign, createMachine } from "xstate";

export const loadingMachine = createMachine(
  {
    id: "LoadingMachine",
    initial: "loading",
    context: {
      data1: "",
      data2: "",
      data3: "",
      count: 0,
      messageError: ""
    },
    states: {
      loading: {
        type: "parallel",
        states: {
          getData3: {
            initial: "fetchingData3",
            states: {
              fetchingData3: {
                invoke: {
                  id: "getData3",
                  src: "getData3",
                  onDone: {
                    target: "success",
                    actions: ["assign_data3", "increment"],
                  },
                  onError: {
                    target: "failure",
                    actions: ["error"]
                  },
                },
              },
              success: { type: "final" },
              failure: {},
            },
          },
          getData12: {
            initial: "fetchingData1",
            states: {
              fetchingData1: {
                invoke: {
                  id: "getData1",
                  src: "getData1",
                  onDone: {
                    target: "fetchingData2",
                    actions: ["assign_data1", "increment"],
                  },
                  onError: {
                    target: "failure",
                    actions: ["error"]
                  },
                },
              },
              fetchingData2: {
                invoke: {
                  id: "getData2",
                  src: "getData2",
                  onDone: {
                    target: "success",
                    actions: ["assign_data2", "increment"],
                  },
                  onError: {
                    target: "failure",
                    actions: ["error"]
                  },
                },
              },
              success: { type: "final" },
              failure: {},
            },
          },
        },
        onDone: {
          target: "loaded",
        },
        on:{
          RESTART: {
            target: "loading",
            actions: ['restart_count']
          }
        }
      },
      loaded: {
        on: {
          RESTART: {
            target: "loading",
            actions: ['restart_count']
          },
        },
      },
    },
  },
  {
    services: {
      getData1: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const math = Math.random();
            math > 0.5 ? resolve("success") : reject("fail");
          }, 1000);
        });
      },
      getData2: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const math = Math.random();
            math > 0.5 ? resolve("success") : reject("fail");
          }, 2000);
        });
      },
      getData3: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const math = Math.random();
            math > 0.5 ? resolve("success") : reject("fail");
          }, 4000);
        });
      },
    },
    actions: {
      assign_data1: assign({ data1: (context, event) => "data1" }),
      assign_data2: assign({ data2: (context, event) => "data2" }),
      assign_data3: assign({ data3: (context, event) => "data3" }),
      error: assign({messageError: (context, event)=> `error on ${event.type}`}),
      increment: assign({ count: (context, event) => context.count + 1 }),
      restart_count: assign({ count: (context, event) => 0, data1: (context, event) => "", data2: (context, event) => "", data3: (context, event) => "", messageError: (context, event) => ""  }),
    },
  }
);
