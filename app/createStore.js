import { observable, action, computed } from "mobx";
import data from "./data";

export default function createStore() {
  return observable({
    // app state
    game: {
      // current level
      level: 0,

      levels: data.levels,

      // the game board
      // state that is obtained from data
      board: computed(function() {
        return this.levels[this.level];
      }),

      reset: action(function() {
        this.levels[this.level] = data.levels[this.level];
      }),

      overallCompleteStatus: computed(function() {
        return this.levels.map(board =>
          board.every(row => row.every(cell => !cell)));
      }),

      percentageComplete: computed(function() {
        return this.overallCompleteStatus.reduce((p, c) => p + (c ? 1 : 0), 0) /
          this.overallCompleteStatus.length *
          100;
      }),

      complete: computed(function() {
        return this.overallCompleteStatus[this.level];
      }),

      invert: action(function(i, j) {
        this.invertOne(i - 1, j + 0);
        this.invertOne(i + 0, j - 1);
        this.invertOne(i + 0, j + 0);
        this.invertOne(i + 0, j + 1);
        this.invertOne(i + 1, j + 0);
      }),

      invertOne: action(function(i, j) {
        // number of rows
        const nr = this.board.length;
        // number of cols
        const nc = this.board[0].length;
        if (i >= 0 && i < nr && j >= 0 && j < nc) {
          this.levels[this.level][i][j] = 1 - this.levels[this.level][i][j];
        }
      }),

      canGoNext: computed(function() {
        return this.level < data.levels.length - 1;
      }),

      gotoNext: action(function() {
        if (!this.canGoNext) {
          throw new Error(
            "Unhandled case - Cannot get next level from last level in data"
          );
        }
        this.level++;
      }),

      canGoPrev: computed(function() {
        return this.level > 0;
      }),

      gotoPrev: action(function() {
        if (!this.canGoPrev) {
          throw new Error(
            "Unhandled case - Cannot get prev level from first level"
          );
        }
        this.level--;
      })
    },

    // caches
    purging: false,
    purgeBrowserCaches: action(function() {
      this.purging = true;
    }),
    completePurge: action(function() {
      this.purging = false;
    })
  });
}
