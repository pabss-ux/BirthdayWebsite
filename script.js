const starsContainer = document.getElementById("stars");
const cake = document.querySelector(".cake");
const instruction = document.getElementById("instruction");
const wishButton = document.getElementById("wishButton");
const message = document.getElementById("message");
const readMoreButton = document.getElementById("readMoreButton");
const extraMessage = document.getElementById("extraMessage");
const personalMessage = document.getElementById("personalMessage");
const replayButton = document.getElementById("replayButton");

const customMessage = `Happy 18th birthday, baby!

Finally, you're 18! I can't believe, it is already been a year since we had simple conversations, we laugh at random things and even make memories together. It's a new chapter in your life and I am so happy and proud of you.

Thank you for being most lovable, caring and amazing girlfriend! You make my days brighter, you make my hard days easier and my happiest moments even more special. You are one of God's greatest blessings in my life.

As you celebrate this milestone, I hope you continue chasing your dreams and believing in yourself. You are beautiful inside and out, strong and kind and you can do so much good things. Don't forget how much you are loved and appreciated, not just today but every day.

I don't know how to show my feelings, but I do know that I am filled with feelings about you and how much you mean to me. Thank you for all the love, patience, understanding, and happiness that you've given to me. I am blessed to be yours actually hahaha.

Have a wonderful special day, my baby. This world is meant for you to receive all the happiness, success, and love that it has to offer. I will be with you at all times, celebrating your successes and by your side through it all.

Happy 18th birthday, baby! I love you so much and I am looking forward to more memories with you.`;

let candlesBlownOut = false;
let wishTimer;

function createStars() {
    starsContainer.replaceChildren();

    for (let i = 0; i < 65; i++) {
        const star = document.createElement("span");

        star.className = "star";
        star.textContent = Math.random() > 0.5 ? "✦" : "✧";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.fontSize = Math.random() * 12 + 6 + "px";
        star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
        star.style.setProperty("--delay", Math.random() * 4 + "s");

        starsContainer.appendChild(star);
    }
}

function createConfetti() {
    const symbols = ["💚", "✨", "💕", "🎉", "⭐", "💖", "🍀", "🎂"];

    for (let i = 0; i < 45; i++) {
        const particle = document.createElement("span");

        particle.className = "confetti";
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.fontSize = Math.random() * 15 + 12 + "px";

        document.body.appendChild(particle);

        const drift = (Math.random() - 0.5) * 180;
        const duration = Math.random() * 2500 + 2500;

        if (typeof particle.animate === "function") {
            const animation = particle.animate(
                [
                    {
                        transform: "translate(0, 0) rotate(0deg)",
                        opacity: 1
                    },
                    {
                        transform: `translate(${drift}px, 110vh) rotate(600deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration,
                    easing: "ease-in",
                    fill: "forwards"
                }
            );

            animation.onfinish = () => particle.remove();
        } else {
            particle.style.animationDuration = duration + "ms";

            setTimeout(() => {
                particle.remove();
            }, duration);
        }
    }
}

function makeWish() {
    if (candlesBlownOut) {
        return;
    }

    candlesBlownOut = true;

    clearTimeout(wishTimer);

    cake.classList.add("blown-out");
    instruction.textContent = "Your wish is on its way, baby! 💚✨";
    wishButton.hidden = true;

    message.classList.add("show");
    replayButton.hidden = false;

    createConfetti();

    setTimeout(() => {
        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 300);
}

function showPersonalMessage() {
    personalMessage.textContent = customMessage;
    extraMessage.hidden = false;
    readMoreButton.hidden = true;

    if (typeof extraMessage.animate === "function") {
        extraMessage.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(15px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 700,
                easing: "ease-out",
                fill: "forwards"
            }
        );
    }

    setTimeout(() => {
        extraMessage.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 150);
}

function replayAnimation() {
    clearTimeout(wishTimer);

    candlesBlownOut = false;

    message.classList.remove("show");
    extraMessage.hidden = true;
    readMoreButton.hidden = false;
    replayButton.hidden = true;
    wishButton.hidden = true;

    cake.classList.remove("blown-out");

    const animatedElements = document.querySelectorAll(
        ".plate, .cake-base, .cake-bottom, .cake-middle, .cake-top, .icing, .drip, .sprinkles, .cake-decoration, .candle, .flame"
    );

    animatedElements.forEach(element => {
        element.style.animation = "none";
        void element.offsetWidth;
        element.style.animation = "";
    });

    instruction.textContent = "Watch your birthday cake come to life! ✨";

    wishTimer = setTimeout(() => {
        if (candlesBlownOut) {
            return;
        }

        wishButton.hidden = false;
        instruction.textContent = "Make a wish and blow the candles! ✨";
    }, 8000);
}

wishButton.addEventListener("click", makeWish);
readMoreButton.addEventListener("click", showPersonalMessage);
replayButton.addEventListener("click", replayAnimation);

createStars();

wishTimer = setTimeout(() => {
    if (candlesBlownOut) {
        return;
    }

    instruction.textContent = "Make a wish and blow the candles! ✨";
    wishButton.hidden = false;
}, 8000);