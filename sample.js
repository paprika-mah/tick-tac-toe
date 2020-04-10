const size = document.querySelectorAll('.table .row').length;
const HYPHEN = '-';
var texts = [];

// console.log(`${size}::::${HYPHEN}`);

document.querySelector('.table').addEventListener('click', function(event){
  // 終了判定処理
  if(document.querySelector('#finished').value === 'true'){
    console.log("finished change True!!!");
    return;
  }

  // 入力チェック(すでに選択済みのマスをクリックした場合は何もしない)
  if(event.target.innerText !== HYPHEN){
    console.log("validationCheck");
    return;
  }

  // This is switch the active pannel
  document.querySelectorAll('.pannel').forEach(function(btn){
    btn.classList.remove("active");
  });

  event.target.classList.add("active");
  event.target.innerText = document.querySelector('.btn.active').text;
  toggleTurn();
  var result = judge();
  if(result){
    document.querySelector('#message').innerText = `${result} win`;
    document.querySelector('#message').classList.remove('hidden'); 
    document.querySelector('#finished').value = 'true';
  }
});

// toggleTurn Function
function toggleTurn(){
  const activated = document.querySelector('.btn.active');
  document.querySelectorAll('.btn').forEach(function(btn){
    btn.classList.add("active");
  });
  activated.classList.remove("active");
}

// judge win or lose
function judge(){
  var judge_result = '';
  // vertical judge 
  for(var x = 1; x <= size; x++){
    for(var y = 1; y <= size; y++){
      texts = appendTexts(texts, x, y);
      if(!texts[0]){
        break;
      } 
    }
    judge_result = isFinalized(texts);
    if(judge_result){
      return judge_result;
    }
  }
  
  // horizonal judge 
  for(var y = 1; y <= size; y++){
    for(var x = 1; x <= size; x++){
      texts = appendTexts(texts, x, y);
      if(!texts[0]){
        break;
      }
    }
    judge_result = isFinalized(texts);
    if(judge_result){
      return judge_result;
    }
  }
  //diagonally judge
  // 欲しいのは1-1,2-2,3-3
  // および1-3,2-2,3-1
  // Firstly, 2-2 validate is.
  // if(document.querySelector(`#pannel-2-2`).innerText != '-'){
  //   console.log('----------checkDiagnolly------------'); 
  //   var temp = document.querySelector(`#pannel-2-2`).innerText
  // }

  x = 1;
  y = 1;
  texts = [];
  while(true){
    texts = appendTexts(texts, x, y);
    if(!texts[0]){
      break;
    }
    x++;
    y++;
    if (x > size || y > size) {
      break;
    }
  }
  judge_result = isFinalized(texts);
  if(judge_result){
    return judge_result;
  }
  
  x = 3;
  y = 1;
  texts = [];
  while(true){
    texts = appendTexts(texts, x, y);
    if(!texts[0]){
      break;
    }
    x--
    y++
    if (x < 1 || y > 3){
      break;
    }
  }
  judge_result = isFinalized(texts);
  if(judge_result){
    return judge_result;
  }
}

function appendTexts(texts, x, y){
  console.log('------------startappendText------------');
  console.log(`#pannel-${x}-${y}`);
  var text = document.querySelector(`#pannel-${x}-${y}`).innerText;
  if(text===HYPHEN){
    return [];
  }
  texts.push(text)
  console.log("textsの中身::" + texts);
  return texts;
}

function isFinalized(texts){
  let result = Array.from(new Set(texts));
  console.log(result);

  if(texts.length === size && result.length === 1){
    judge_result = result[0];
    return judge_result;
  }
  return null;
}

// function isFinalized(list){
//   // なぜlet?
//   let result = Array.from(new Set(list));
//   console.log(`This is : ${result}`);
//   console.log(result);

// }