// convert kebab case to text
// yolo version
export function kebabToText(kebab: string): string {
  let text = kebab.split('-').join(' ');
  return text[0].toUpperCase() + text.substring(1,text.length);
}

// convert kebab case to camelCase
export function kebabToCamelCase(kebab: string): string {
  // return kebab
  //   .split('-')
  //   .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
  //   .join('');
  return kebab.replace(/-./g, match => match.charAt(1).toUpperCase());
}
export function grabGoogleCreds(): { apiKey: string, clientId: string } {
  return {
    apiKey: process.env.GOOGLE_API_KEY || "",
    clientId: process.env.GOOGLE_CLIENT_ID || "",
  };
}

export function urlReplacer(matched: string): string {
  let withProtocol = matched

  if(!withProtocol.startsWith("http")) {
    withProtocol = "http://" + matched
  }

  return  `<a class="text-orange-rgb"
              target="_blank"
              href="${withProtocol}">
    ${ matched.length > 30 ? matched.slice(0, 30) + "..." : matched }
  </a>`;
}
