import faker from 'faker';
import _ from 'lodash';

export function getChallenges(total = 20) {
  return _.range(20).map(index => {
    return {
      id: `challenge-${index}`,
      title: faker.lorem.sentence(),
      picture: faker.image.nature(),
      content: faker.lorem.paragraphs(),
      author: faker.name.findName()
    };
  });
}

export function getChallengeDetail() {
  return {
    challenge: {
      id: `challenge-1`,
      title: faker.lorem.sentence(),
      picture: faker.image.nature(),
      content: faker.lorem.paragraphs(),
      author: {
        name: faker.name.findName(),
        avatar: faker.image.avatar()
      }
    },
    photos: _.range(20).map(() => {
      return faker.image.food();
    }),
    completedUsers: _.range(10).map(() => {
      return {
        name: faker.name.findName(),
        firstName: faker.name.firstName(),
        avatar: faker.image.avatar()
      };
    })
  };
}
