export default class TextHelper {

  public static returnJustNumber (text: string) {
    const newText = text.replace(/\D/g, '');
    return Number(newText);
  }

}