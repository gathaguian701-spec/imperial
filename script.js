// Fun Fact Library
const funFacts = [
  "The Bible is the most translated book in the world!",
  "Jesus wept. (John 11:35)",
  "‘Fear not’ appears 365 times in the Bible — one for each day!",
  "Noah’s Ark was roughly the length of one and a half football fields.",
  "The word 'Christian' appears only three times in the entire Bible.",
  "Psalm 117 is the shortest chapter in the Bible.",
  "The Bible was written by over 40 authors across 1,500 years.",
  "‘Hallelujah’ means ‘Praise the Lord’ in Hebrew.",
  "There are 66 books in the Bible.",
  "The word ‘love’ appears over 500 times in Scripture.",
  "David killed Goliath when he was still a teenager!",
  "Jesus began His public ministry at about 30 years old.",
  "Timothy became a church leader in his youth.",
  "God doesn’t call the qualified; He qualifies the called.",
  "The word ‘Gospel’ means ‘Good News’.",
  "Rainbows are a symbol of God’s promise to Noah.",
  "God created light before He created the sun. (Genesis 1:3)",
  "‘Selah’ means to pause and reflect.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Prayer changes both the world and the one who prays.",
  "Every heartbeat is a reminder of God’s ongoing grace.",
  "The Bible was originally written in Hebrew, Aramaic, and Greek.",
  "Every snowflake has six sides — just like no two people are alike.",
  "‘Emmanuel’ means ‘God with us’.",
  "Jesus performed 37 recorded miracles in the Gospels.",
  "The word ‘Amen’ means ‘so be it’ or ‘truly’.",
  "The Ten Commandments appear twice in the Bible.",
  "Faith is mentioned over 240 times in Scripture.",
  "Early Christians met in homes before churches were built.",
  "Forgiveness doesn’t change the past — it opens the future."
];

// Function to get today's fun fact
function setFunFactOfTheDay() {
  const today = new Date().toDateString();
  const saved = JSON.parse(localStorage.getItem("funFactOfTheDay"));

  if (!saved || saved.date !== today) {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    const newFact = { date: today, fact: funFacts[randomIndex] };
    localStorage.setItem("funFactOfTheDay", JSON.stringify(newFact));
    document.getElementById("funFact").innerText = newFact.fact;
  } else {
    document.getElementById("funFact").innerText = saved.fact;
  }
}

// Run on load
window.onload = setFunFactOfTheDay;
