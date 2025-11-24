export const quizReguest = {
  data: {
    assistantResponse: {
      mentalHealthCondition: "PTSD",
      challenges: [
        {
          challenge: "ManagingIntrusiveMemories",
          goals: [
            {
              goal: "Understandthenatureofintrusivememories",
              prompts:
                "Reflectonhowintrusivememoriesaffectyourdailylife.Whatpatternsdoyounotice?",
              nextSteps: "DirectusertotheJournalfeature",
              quizzes: [
                {
                  question: "WhichisNOTtypicallytrueaboutintrusivememories?",
                  options: [
                    "A)Theycanfeelveryreal",
                    "B)Theyoftencomeunexpectedly",
                    "C)Theyaccuratelypredictthefuture",
                    "D)Theycanbeemotionallyintense",
                  ],
                  correctAnswer: "C)Theyaccuratelypredictthefuture",
                },
              ],
              tips: "Intrusivememoriesarelikeuninvitedguests.Theymayarriveunexpectedly,butrememberingthattheywillalsoleavecanhelpyoucopewiththeirpresence.",
            },
            {
              goal: "Developgroundingtechniques",
              prompts:
                "Howaboutlisteningtoaguidedgroundingexerciseinouraudiolibrary?.",
              nextSteps: "GuideusertotheAudioLibrary",
              quizzes: [
                {
                  question: "Whichisanexampleofagroundingtechnique?",
                  options: [
                    "A)Naming5thingsyoucanseerightnow",
                    "B)Relivingthememoryindetail",
                    "C)Tryingtopredictfutureevents",
                    "D)Ignoringyoursurroundings",
                  ],
                  correctAnswer: "A)Naming5thingsyoucanseerightnow",
                },
              ],
              tips: "Trythe'5-4-3-2-1'technique:Name5thingsyousee,4thingsyoucantouch,3thingsyouhear,2thingsyoucansmell,and1thingyoucantaste.Thisengagesyoursensesandhelpsanchoryouinthepresentmoment.",
            },
            {
              goal: "Createasafementalspace",
              prompts:
                "Imagineaplacewhereyoufeelcompletelysafeandatpeace.Whatdoesitlooklike?",
              nextSteps: "DirectusertotheJournalfeature",
              quizzes: [
                {
                  question: "Asafementalspaceshouldbe:",
                  options: [
                    "A)Basedontraumaticmemories",
                    "B)Arealplaceyou'reafraidtovisit",
                    "C)Acalmingimageyoucaneasilyvisualize",
                    "D)Acrowded,busyenvironment",
                  ],
                  correctAnswer: "C)Acalmingimageyoucaneasilyvisualize",
                },
              ],
              tips: "Yoursafementalspaceislikeapersonalsanctuary.It'salwaysavailabletoyou,nomatterwhereyouare.Visualizingthisspaceduringdifficultmomentscanprovideasenseofsafetyandcalm.",
            },
            {
              goal: "Practicemindfulobservationofmemories",
              prompts:
                "Whenamemoryarises,tryobservingitwithoutjudgment,asifyou'rewatchingamovie.Howdoesthischangeyourexperience?",
              nextSteps: "DirectusertotheJournalfeature",
              quizzes: [
                {
                  question: "Mindfulobservationofmemoriesinvolves:",
                  options: [
                    "A)Tryingtochangethememory",
                    "B)Noticingthememorywithoutgettingcaughtupinit",
                    "C)Believingeverythingthememorytellsyou",
                    "D)Suppressingthememoryentirely",
                  ],
                  correctAnswer:
                    "B)Noticingthememorywithoutgettingcaughtupinit",
                },
              ],
              tips: "Memoriesarelikecloudsintheskyofyourmind.Youcannoticethempassingbywithouthavingtochasethemorgetcaughtinthestorm.Thisperspectivecanreducetheirpoweroveryou.",
            },
            {
              goal: "Developapost-intrusioncareroutine",
              prompts:
                "Howaboutschedulingregularcheck-instoreviewandadjustyourcareroutine?",
              nextSteps: "DirectusertotheJournalfeature",
              quizzes: [
                {
                  question:
                    "Whichisahelpfulcomponentofapost-intrusioncareroutine?",
                  options: [
                    "A)Immediatelyreturningtowork",
                    "B)Engaginginacalmingactivity",
                    "C)Analyzingthememoryindetail",
                    "D)Isolatingyourselffromothers",
                  ],
                  correctAnswer: "B)Engaginginacalmingactivity",
                },
              ],
              tips: "Apost-intrusioncareroutineislikeafirstaidkitforyourmind.Havingitpreparedinadvancemeansyoudon'thavetofigureoutwhattodointhemoment–youcansimplyfollowyourplan.",
            },
          ],
        },
      ],
    },
    responseType: "quiz",
    error: "",
    threadId: "thread_5XTmKzLmrJrjup6NNesaZpDm",
    validationMessage: "",
    trackId: "6701820c-3781-432e-af93-cd840cd8485d",
  },
  statusCode: 200,
  message: "Record returned Successfully.",
  success: true,
};
export const saveQuizReguest = {
  userId: 0,
  quiz: [
    {
      question: "WhichisNOTtypicallytrueaboutintrusivememories?",
      correctAnswer: "C)Theyaccuratelypredictthefuture",
      options: [
        {
          optionText: "A)Theycanfeelveryreal",
          isSelected: false,
        },
        {
          optionText: "B)Theyoftencomeunexpectedly",
          isSelected: false,
        },
        {
          optionText: "C)Theyaccuratelypredictthefuture",
          isSelected: false,
        },
        {
          optionText: "D)Theycanbeemotionallyintense",
          isSelected: true,
        },
      ],
    },
  ],
};
