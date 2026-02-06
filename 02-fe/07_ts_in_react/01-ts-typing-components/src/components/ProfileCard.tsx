// components/ProfileCard.tsx
// This component should receive a `user` object with `name` (string) and `age` (number)
type User = {
  name: string;
  age: number;
};
const ProfileCard = ({ user }: { user: User }) => {
  return (
    <p>
      {user.name} is {user.age} years old
    </p>
  );
};

export default ProfileCard;
