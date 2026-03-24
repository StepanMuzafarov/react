import fs from "fs";
import YAML from "yamljs";
import { faker } from "@faker-js/faker";

const SWAGGER_PATH = "docs/swagger.yaml";

function genLoginExample() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  };
}

function genRegisterExample() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    username: faker.person.firstName(),
    userType: faker.helpers.arrayElement(['normal', 'pro']),
  };
}

function genOfferExample() {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    publishDate: faker.date.recent().toISOString().slice(0, 10),
    city: faker.helpers.arrayElement(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']),
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    rating: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
    type: faker.helpers.arrayElement(["apartment", "house", "room", "hotel"]),
    rooms: faker.number.int({ min: 1, max: 5 }),
    guests: faker.number.int({ min: 1, max: 8 }),
    price: faker.number.int({ min: 100, max: 500 }),
    features: JSON.stringify(['Breakfast', 'Air conditioning', 'Washer', 'Towels', 'Fridge']),
    commentsCount: faker.number.int({ min: 0, max: 50 }),
    latitude: Number(faker.location.latitude({ min: 48, max: 54 })),
    longitude: Number(faker.location.longitude({ min: 2, max: 11 })),
    userId: faker.number.int({ min: 1, max: 10 })
  };
}

function genReviewExample() {
  return {
    comment: faker.lorem.paragraph({ min: 50, max: 200 }),
    rating: faker.number.int({ min: 1, max: 5 })
  };
}

const raw = fs.readFileSync(SWAGGER_PATH, "utf-8");
const doc = YAML.parse(raw);

const loginContent = doc?.paths?.["/login"]?.post?.requestBody?.content?.["application/json"];
if (loginContent) {
  loginContent.example = genLoginExample();
}

const registerContent = doc?.paths?.["/register"]?.post?.requestBody?.content?.["multipart/form-data"];
if (registerContent) {
  registerContent.example = genRegisterExample();
}

const offerContent = doc?.paths?.["/offers"]?.post?.requestBody?.content?.["multipart/form-data"];
if (offerContent) {
  offerContent.example = genOfferExample();
}

const reviewContent = doc?.paths?.["/comments/{offerId}"]?.post?.requestBody?.content?.["application/json"];
if (reviewContent) {
  reviewContent.example = genReviewExample();
}

fs.writeFileSync(SWAGGER_PATH, YAML.stringify(doc), "utf-8");
console.log("Примеры записаны в", SWAGGER_PATH);