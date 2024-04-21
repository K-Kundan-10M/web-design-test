let regex = /[a-zA-Z]/;
setInterval(
  fetch(
    "https://script.google.com/macros/s/AKfycbzzr6pMu6aCeezVcGgM-fsQQ5y6pwFYnzki4kvUVvUvwll9zOve44IolcyCSdJPh_A/exec"
  )
    .then((response) => response.json())
    .then((json) => {
      let container1 = document.querySelector(".container");
      let container2 = document.querySelector(".container2");
      let filtered = document.querySelector("#filteration");
      let h1 = document.querySelector("#heading1");
      let h2 = document.querySelector("#heading2");
      let h3 = document.querySelector("#fil_name");
      let filterNavebar = document.querySelector("#filterNavebar");
      var categories = ["All"];
      for (let i = 1; i < json.data.length; i++) {
        if (
          !categories.includes(json.data[i].Position) &
          regex.test(json.data[i].Position)
        ) {
          categories.push(json.data[i].Position);
        }
      }

      function generateNavBar(categories) {
        var navBar = document.createElement("div");
        navBar.setAttribute("class", "topnav");
        navBar.setAttribute("id", "myTopnav");
        var i = 0;
        categories.forEach(function (category) {
          var a = document.createElement("a");
          a.setAttribute("class", "flt_button");
          a.setAttribute("name", categories[i]);

          a.textContent = category.charAt(0).toUpperCase() + category.slice(1);
          navBar.appendChild(a);
          i = i + 1;
        });
        var b = document.createElement("a");
        b.href = "javascript:void(0);";

        b.style.fontSize = "15px";

        b.classList.add("icon");

        b.innerHTML = "&#9776;";

        b.onclick = function () {
          var x = document.getElementById("myTopnav");
          if (x.className === "topnav") {
            x.className += " responsive";
          } else {
            x.className = "topnav";
          }
        };
        navBar.appendChild(b);

        filterNavebar.appendChild(navBar);
      }
      generateNavBar(categories);
      let flt = document.getElementsByClassName("flt_button");
      for (var i = 0; i < flt.length; i++) {
        flt[i].addEventListener("click", filteration);
      }

      function filteration() {
        show_hide(this.name);
      }
      function show_hide(name) {
        filtered.innerHTML = "";
        container1.style = "display:none;";
        container2.style = "display:none;";
        h1.style = "display:none;";
        h2.style = "display:none;";
        h3.innerHTML = name;
        if (name === "All") {
          container1.style = "display:flex;";
          container2.style = "display:flex;";
          h3.innerHTML = "";
          h1.innerHTML = "Group Members";
          h2.style = "Alumin";
        }

        for (let i = 1; i < json.data.length; i++) {
          if (!regex.test(json.data[i].Name)) {
            continue;
          }

          let shortbio = [
            [
              json.data[`${i}`].Shortbio1,
              json.data[`${i}`].Shortbio2,
              json.data[`${i}`].Shortbio3,
              json.data[`${i}`].Shortbio4,
            ],
          ];
          image_link = json.data[i].Image;
          image_link = image_link.split("/");
          image_link = image_link[3].split("?");
          image_link =
            "https://drive.google.com/uc?export=view&" + image_link[1];

          if (json.data[i].Position === name) {
            let members = [
              {
                name: `${json.data[`${i}`].Name}`,
                role: `${json.data[`${i}`].Position}, ${
                  json.data[`${i}`]["Department/Center/School"]
                }`,
                email: `${json.data[`${i}`].email}`,
                imageUrl: image_link,
                details: shortbio.filter((shortbio) => {
                  return regex.test(shortbio);
                }),
              },
            ];

            members.forEach((member) => {
              let memberElement = document.createElement("div");
              memberElement.className = "member";

              let imageContainer = document.createElement("div");
              imageContainer.className = "member-image-container";

              let image = document.createElement("img");
              image.src = member.imageUrl;
              image.alt = "Member Image";
              image.className = "member-image";

              imageContainer.appendChild(image);

              let infoContainer = document.createElement("div");
              infoContainer.className = "member-info";

              let nameElement = document.createElement("h2");
              nameElement.className = "member-name";
              nameElement.textContent = member.name;

              let roleElement = document.createElement("p");
              roleElement.className = "member-role";
              roleElement.textContent = member.role;

              let emailElement = document.createElement("p");
              emailElement.className = "member-email";
              emailElement.textContent = "email: " + member.email;

              infoContainer.appendChild(nameElement);
              infoContainer.appendChild(roleElement);
              infoContainer.appendChild(emailElement);

              let detailsList = document.createElement("ul");
              detailsList.style.listStyleType = "disc";

              member.details.forEach((detail) => {
                let listItem = document.createElement("li");
                listItem.textContent = detail;
                detailsList.appendChild(listItem);
              });

              infoContainer.appendChild(detailsList);

              memberElement.appendChild(imageContainer);
              memberElement.appendChild(infoContainer);

              filtered.appendChild(memberElement);
            });
          }
        }
      }

      for (let i = 1; i < json.data.length; i++) {
        if (!regex.test(json.data[i].Name)) {
          continue;
        }

        let shortbio = [
          [
            json.data[`${i}`].Shortbio1,
            json.data[`${i}`].Shortbio2,
            json.data[`${i}`].Shortbio3,
            json.data[`${i}`].Shortbio4,
          ],
        ];
        image_link = json.data[i].Image;
        image_link = image_link.split("/");
        image_link = image_link[3].split("?");
        image_link = "https://drive.google.com/uc?export=view&" + image_link[1];

        if (json.data[i].Alumni === 0) {
          let members = [
            {
              name: `${json.data[`${i}`].Name}`,
              role: `${json.data[`${i}`].Position}, ${
                json.data[`${i}`]["Department/Center/School"]
              }`,
              email: `${json.data[`${i}`].email}`,
              imageUrl: image_link,
              details: shortbio.filter((shortbio) => {
                return regex.test(shortbio);
              }),
            },
          ];

          members.forEach((member) => {
            let memberElement = document.createElement("div");
            memberElement.className = "member";

            let imageContainer = document.createElement("div");
            imageContainer.className = "member-image-container";

            let image = document.createElement("img");
            image.src = member.imageUrl;
            image.alt = "Member Image";
            image.className = "member-image";

            imageContainer.appendChild(image);

            let infoContainer = document.createElement("div");
            infoContainer.className = "member-info";

            let nameElement = document.createElement("h2");
            nameElement.className = "member-name";
            nameElement.textContent = member.name;

            let roleElement = document.createElement("p");
            roleElement.className = "member-role";
            roleElement.textContent = member.role;

            let emailElement = document.createElement("p");
            emailElement.className = "member-email";
            emailElement.textContent = "email: " + member.email;

            infoContainer.appendChild(nameElement);
            infoContainer.appendChild(roleElement);
            infoContainer.appendChild(emailElement);

            let detailsList = document.createElement("ul");
            detailsList.style.listStyleType = "disc";

            member.details.forEach((detail) => {
              let listItem = document.createElement("li");
              listItem.textContent = detail;
              detailsList.appendChild(listItem);
            });

            infoContainer.appendChild(detailsList);

            memberElement.appendChild(imageContainer);
            memberElement.appendChild(infoContainer);

            container1.appendChild(memberElement);
          });
        } else {
          if (!regex.test(json.data[i].Name)) {
            continue;
          }
          let alumni = [
            {
              name: `${json.data[`${i}`].Name}`,
              role: `${json.data[`${i}`].Position}, ${
                json.data[`${i}`]["Department/Center/School"]
              }`,
              email: `${json.data[`${i}`].email}`,
              imageUrl: json.data[i].Image,
              additionalInfo: `${json.data[`${i}`].Whatdoyoudonow}`,
            },
          ];

          let container = document.querySelector(".container2");

          alumni.forEach((alumnus) => {
            let alumniCard = document.createElement("div");
            alumniCard.className = "alumni-card";

            let image = document.createElement("img");
            image.src = alumnus.imageUrl;
            image.alt = "Alumni Image";

            let infoContainer = document.createElement("div");

            let nameElement = document.createElement("h3");
            nameElement.textContent = alumnus.name;

            let roleElement = document.createElement("p");
            roleElement.textContent = alumnus.role;

            let emailElement = document.createElement("p");
            emailElement.textContent = "email: " + alumnus.email;

            let additionalInfoElement = document.createElement("p");
            additionalInfoElement.textContent = alumnus.additionalInfo;

            infoContainer.appendChild(nameElement);
            infoContainer.appendChild(roleElement);
            infoContainer.appendChild(emailElement);
            infoContainer.appendChild(additionalInfoElement);

            alumniCard.appendChild(image);
            alumniCard.appendChild(infoContainer);

            container2.appendChild(alumniCard);
          });
        }
      }
    })
    .catch("error occcured"),
  500
);