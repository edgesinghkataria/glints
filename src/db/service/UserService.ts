import UserModel from '../model/UserModel';

type createUserInput = {
  name: string;
  mobileNumber: string;
};

export default class UserService {
  create(payload: UserModel) {
    return UserModel.create(payload);
  }

  findOneByMobile(mobileNumber: string) {
    return UserModel.findOne({
      where: {
        name: mobileNumber,
      },
    });
  }
}
