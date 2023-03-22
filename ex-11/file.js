function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
const players = ["Joe", "Caroline", "Sabrina"];
for(let player of players){
    luckyDraw(player).then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err.message)
    })
}