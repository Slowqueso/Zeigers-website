import mongoose from "mongoose";

const riddlerSchema = mongoose.Schema(
  {
    user: {
      type: Object, //store the complete user object from locals
      required: true,
    },
    totalPoints: {
      type: Number,
      default: 0, //total points of attempted quests
    },
    progress: {
      type: Number,
      required: true, //track of question number
      default: 0,
    },
    //array of response inputs
    answers: [],
    questions: [
      {
        question_number: {
          type: Number,
        },
        hint: [
          {
            number: {
              type: Number,
              default: 1,
              required: true,
            },
            status: {
              type: Boolean,
              default: false,
              required: true,
            },
          },
        ],
      },
    ],
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  }
);

// riddlerSchema.pre('save', function(next) {         //updating total points before save
//     if(!this.isModified(this.answers)){
//         next();
//     }
//     this.totalPoints = this.totalPoints + this.points
// });

// riddlerSchema.post('save', function() {         //updating progress after save
//     this.progress = this.answers.length
// });

const Riddler = mongoose.model("Riddler", riddlerSchema);

export default Riddler;
