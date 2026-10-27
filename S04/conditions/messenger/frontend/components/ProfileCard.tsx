import type { User } from "../types";

type Props = {
  profile: User | null;
};

export function ProfileCard({ profile }: Props) {
  if (!profile) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: 12 }}>
      <div><b>Ник:</b> {profile.nickname}</div>
      <div><b>Телефон:</b> {profile.phone}</div>
      <div><b>Описание:</b> {profile.bio}</div>
    </div>
  );
}

export default ProfileCard;