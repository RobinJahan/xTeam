import { assign, createMachine } from 'xstate';

export const formMachine = createMachine({
    id: 'form',
    initial: 'idle',
    context: {
        name: '',
        mail: '',
        team: 'Cat',
    },
    states: {
        idle: {
            on: {
                SHOW_FORM: {
                    target: "form"
                }
            }
        },
        form: {
            on: {
                INPUT_NAME: {
                    actions: ['assign_name']
                },
                INPUT_MAIL: {
                    actions: ['assign_mail']
                },
                INPUT_TEAM: {
                    actions: ['assign_team']
                },
                BACK: {
                    target: 'idle'
                },
                SUBMIT: [
                    {
                        cond: "requiredFields",
                        actions: ['emptyFields']
                    },
                    {
                        target: 'submitting'
                    }
                ]
            },
            initial: "normal",
            states: {
                normal: {},
                invalid: {}
            }
        },
        submitting: {
            invoke: {
                id: 'submitting',
                src: 'request',
                onDone: {
                    target: 'success'
                },
                onError: {
                    target: 'form.invalid'
                }
            }
        },
        success: {
            on: {
                RESTART: {
                    target: "form",
                    actions: ['clean_form']
                },
                FINISH: {
                    target: "end"
                }
            }
        },
        end: {
            type: "final"
        },
    }
},
    {
        actions: {
            assign_name: assign({ name: (context, event) => event.value }),
            assign_mail: assign({ mail: (context, event) => event.value }),
            assign_team: assign({ team: (context, event) => event.value }),
            clean_form: assign({ name: '', mail: '', team: '' }),
            emptyFields: () => { alert("All fields are required") },
        },
        services: {
            request: () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const math = Math.random();
                        math > 0.5 ? resolve('success') : reject('fail');
                    }, 2000);
                })
            }
        },
        guards: {
            requiredFields: (context) => {
                return !context.name
                    || "" === context.name.trim()
                    || !context.mail
                    || "" === context.mail.trim();
            }

        },
    });
