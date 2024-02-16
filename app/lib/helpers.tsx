// convert kebab case to text
// yolo version
export function kebabToText(kebab: string) {
  let text = kebab.split('-').join(' ');
  return text[0].toUpperCase() + text.substring(1,text.length);
}
