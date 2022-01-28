const sponsors = [
  {
    name: "Sponsor",
    logo: "/Assets/svgs/spon.svg",
    desc: "Chirag Bhatia.",
    address: "244, X,n S R Road, Nsr Road, Saibabacolony",
    contact: "1234567890",
    email: "abc@gmail.com",
    webLink: "www.lmao.com",
  },
  {
    name: "Sponsor",
    logo: "/Assets/svgs/spon.svg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, est.",
    address: "244, X,n S R Road, Nsr Road, Saibabacolony",
    contact: "1234567890",
    email: "abc@gmail.com",
    webLink: "www.lmao.com",
  },
  {
    name: "Sanjana Dubey",
    logo: "/Assets/svgs/spon.svg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, est.",
    address: "244, X,n S R Road, Nsr Road, Saibabacolony",
    contact: "1234567890",
    email: "abc@gmail.com",
    webLink: "www.lmao.com",
  },
  {
    name: "Sanjana Dubey",
    logo: "/Assets/svgs/spon.svg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, est.",
    address: "244, X,n S R Road, Nsr Road, Saibabacolony",
    contact: "1234567890",
    email: "abc@gmail.com",
    webLink: "www.lmao.com",
  },
  {
    name: "Sponsor",
    logo: "/Assets/svgs/spon.svg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, est.",
    address: "244, X,n S R Road, Nsr Road, Saibabacolony",
    contact: "1234567890",
    email: "abc@gmail.com",
    webLink: "www.lmao.com",
  },
];

const container = document.querySelector("#cardContainer");
const modalContainer = document.querySelector("#modalContainer");

const closeModal = () => {
  modalContainer.style.display = "none";
};
modalContainer.addEventListener("click", () => {
  closeModal();
});
const displayModal = (id) => {
  console.log("gay");
  modalContainer.style.display = "flex";
  modalContainer.innerHTML = `  <div class="model">
    <div class="modelVector">
      <img src="/Assets/images/modelVector.png" alt="" />
      <div class="logo_title_description">
        <div class="logo_title">
          <div class="zieger_logo">
            <img
              src="${sponsors[id].logo}"
              alt=""
            />
          </div>
          <div class="model_title">${sponsors[id].name}</div>
        </div>
        <div class="model_description">
          <p>
            ${sponsors[id].desc}
          </p>
        </div>
      </div>
      <div class="location">
        <div class="location_title">Location</div>
        <div class="location_icon_and_address">
          <div class="location_address">
            ${sponsors[id].address}
          </div>
          <div class="location_icon">
            <div class="location_icon_container"></div>
            <div class="location_icon_image">
              <img src="/Assets/images/location_icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="contact">
        <div class="contact_title">Contact</div>
        <div class="phone_and_email">
          <div class="phone">
            <div class="phone_number">${sponsors[id].contact}</div>
            <div class="phone_icon">
              <div class="phone_icon_container">
                <img src="/Assets/images/phone_icon.png" alt="" />
              </div>
            </div>
          </div>
          <div class="email">
            <div class="email_id">${sponsors[id].email}</div>
            <div class="email_icon">
              <div class="email_icon_container">
                <img src="/Assets/images/email_icon.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="visit">
        <div class="visit_title">Visit</div>
        <div class="visit_link">${sponsors[id].webLink}</div>
      </div>
      <div class="social_media_handles">
        <div class="instagram_icon">
          <img src="/Assets/images/instagram_icon.png" alt="" />
        </div>
        <div class="facebook_icon">
          <img src="/Assets/images/facebook_icon.png" alt="" />
        </div>
        <div class="twitter_icon">
          <img src="/Assets/images/twitter_icon.png" alt="" />
        </div>
      </div>
    </div>
    <div class="close_icon">
    </div>
  </div>`;
};
for (let i = 0; i < sponsors.length; i++) {
  container.innerHTML += `    <div class="card-sponsors" card-id="${i}">
      <img src="/Assets/svgs/Spons-card-bg.svg" />
      <img src="/Assets/svgs/Spons-card-moon.svg" />
      <div class="card-sponsors-content">
        <div class="sponsors-img">
          <img src="${sponsors[i].logo}" />
        </div>
        <div class="sponsors-desc">
          <p class="card-sponsors-body">
            ${sponsors[i].desc}
          </p>
        </div>
      </div>
      <div class="card-sponsors-link">
        <h1 class="sponsors-button">Learn More</h1>
      </div>
    </div>`;
}

document.querySelectorAll(".card-sponsors").forEach((card) => {
  card.addEventListener("click", () => {
    displayModal(card.getAttribute("card-id"));
  });
});
