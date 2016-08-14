let language = 'english'

const data = {
  'icelandic': require('../language/icelandic.json'),
  'english': require('../language/english.json')
}

export function setLanguage(lang){
  language = lang
}

export function get(key){
  return data[language][key] || ''
}

export function L(key,...args){
  let value = get(key)

  args.forEach( (arg, index) => {
    value = value.replace(`#${index + 1}`,arg)
  })

  return value
}
