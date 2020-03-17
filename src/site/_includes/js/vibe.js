const vibes = [
  '...and you are awsome!',
  '...have a wonderful day!',
  "...and you've got this!",
  '...and so is this puppy! 🐶'
]

const vibe = vibes[Math.floor(Math.random() * vibes.length)]

// display a good vibe
document.querySelector('.vibe').append(vibe)
