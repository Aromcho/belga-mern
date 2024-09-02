import UserStore from './UserStore';

const RootStore = () => {
  return {
    userStore: UserStore(),
  };
};

export default RootStore;
