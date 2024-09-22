import surpisedMePrompts from "../constants/index";
import FileSaver from "file-saver"

const getRandomPrompts = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpisedMePrompts.length )
    const randomPrompt = surpisedMePrompts[randomIndex]

    if (randomPrompt === prompt ) return getRandomPrompts(prompt)

    return  randomPrompt

}

export default getRandomPrompts

export async function donwloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpeg`);
}