import { User } from '../../user/user.entity';

export default class TestUtil {
  static giveMeValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'Testing User';
    user.id = 1;

    return user;
  }
}
