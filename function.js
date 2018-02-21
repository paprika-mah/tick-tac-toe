const size = document.querySelectorAll('.table .row').length
const HYPHEN = '-'

document.querySelector('.table').addEventListener('click',function(e){
  if(document.querySelector('#finished').value === 'true'){return}
  if(e.target.innerText !== HYPHEN){return}

  document.querySelectorAll('.pannel').forEach(function( btn ) {
    btn.classList.remove("active")
  })
  e.target.classList.add("active")
  e.target.innerText = document.querySelector('.btn.active').text
  toggleTurn()
  result = judge()
  if (result){
    document.querySelector('#message').innerText = `${result} win !!!!!!!!`
    document.querySelector('#message').classList.remove('hidden')
    document.querySelector('#finished').value = 'true'
  }
})


// Turnの切り替えメソッド
function toggleTurn(){
   const acitvated = document.querySelector('.btn.active')
   document.querySelectorAll('.btn').forEach(function( btn ) {
     btn.classList.add("active")
   })
   acitvated.classList.remove("active")
}

// 終了判定メソッド
// 勝負がついていない場合・・・null
// どちらかが勝った場合・・・ "○" or "×"
function judge(){
  judge_reuslt = null
  for( var x = 1; x <= size; x++ ){
    texts = []
    for( var y = 1; y <= size ; y++){
      texts = appendTexts(texts, x, y)
      if(!texts[0]){break}
    }
    judge_reuslt = isFinalized(texts)
    if (judge_reuslt){ return judge_reuslt}
  }

  for( var y = 1; y <= size; y++ ){
    texts = []
    for( var x = 1; x <= size ; x++){
      texts = appendTexts(texts, x, y)
      if(!texts[0]){break}
    }
    judge_reuslt = isFinalized(texts)
    if (judge_reuslt){ return judge_reuslt}
  }

  x = 1
  y = 1
  texts = []
  while(true){
    texts = appendTexts(texts, x, y)
    if(!texts[0]){break}
    x++
    y++
    if ( x > size || y > size) {break}
  }
  judge_reuslt = isFinalized(texts)
  if (judge_reuslt){ return judge_reuslt}

  x = size
  y = 1
  texts = []
  while(true){
    texts = appendTexts(texts, x, y)
    if(!texts[0]){break}
    x--
    y++
    if ( x < 1 || y > size) {break}
  }
  judge_reuslt = isFinalized(texts)
  if (judge_reuslt){ return judge_reuslt}

  return judge_reuslt
}

function isFinalized(list){
  let result = Array.from(new Set(list))
  if (texts.length === size && result.length === 1 ){
    judge_reuslt = result[0]
    return judge_reuslt
  }
  return null
}

function appendTexts(a, x, y){
  text = document.querySelector(`#pannel-${x}-${y}`).innerText
  if( text === HYPHEN ){ return []}
  a.push(text)
  return a
}
