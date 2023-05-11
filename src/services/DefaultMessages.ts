const defaultMessages = [
  'Im not sure if theyre gonna come to the party, but I hope they do.',
  'She hasnt been feeling well lately, but shes toughing it out.',
  'Its such a beutiful day today, I hope it stays like this all week.',
  'I think I seen that movie before, but I cant quite remember.',
  "They was supposed to be here by now, I wonder what's keeping them.",
  'Im just gonna lay down for a minuet and rest my eyes.',
  "My cat likes to lay on my keyboard when I'm trying to type, it's so annyoing.",
  "I'm not good at math, so I always have to use a caculator.",
  'Can you borrow me your pen for a sec? I need to write something down.',
  "I always loose my keys, it's so frustrating!",
  "I have two many things to do today, I don't know where to start!",
  "She said she would be hear in ten minutes, but it's already been fifteen.",
  "The dog chased it's tail round and round, it was really funny to watch.",
  "I could of gone to the store, but I didn't feel like it.",
  'He told me to meet him at the park, but I forgot which one.',
  'My sister and me are going to the mall, do you want to come with?',
  'I seen a really cool shirt at the store yesterday, but it was too expensive.',
  "I don't never eat sushi, I don't like it at all.",
  "He done all the work himself, he's very proud of his accomplishment.",
  "I'm use to getting up early, so I don't mind the morning shift.",
]

export function getRandomMessage() {
  const min = Math.ceil(0)
  const max = Math.floor(19)
  return defaultMessages[Math.floor(Math.random() * (max - min + 1) + min)] // The maximum is inclusive and the minimum is inclusive
}

export const instructions = [
  {
    text: '1. Type your text in the text area on the left',
    img: '../../src/assets/images/slide1.jpg',
  },
  {
    text: '2. Pick the style you want.',
    img: '../../src/assets/images/Slide2.JPG',
  },
  {
    text: "3. Click 'rewrite' and watch the magic happen!",
    img: '../../src/assets/images/Slide3.JPG',
  },
  {
    text: "4. Copy the text you want with the 'copy' button.",
    img: '../../src/assets/images/Slide1.JPG',
  },
]
