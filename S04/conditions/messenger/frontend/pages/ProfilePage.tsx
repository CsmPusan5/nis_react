import { useEffect, useState } from "react";
import type { User } from "../types";
import { getProfile, updateProfile } from "../api/userApi";
import { handleError } from "../helpers/handleError";
import { ProfileCard } from "../components/ProfileCard";

type Props = {
  token: string;
};

export function ProfilePage({ token }: Props) {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getProfile(token)
      .then((user) => {
        if (cancelled) return;
        setProfile(user);
        setNickname(user.nickname);
        setBio(user.bio);
      })
      .catch((e) => {
        if (!cancelled) setError(handleError(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const updated = await updateProfile(token, { nickname, bio });
      setProfile(updated);
      setNickname(updated.nickname);
      setBio(updated.bio);
    } catch (e) {
      setError(handleError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Профиль</h2>
      {loading && <p>Загрузка...</p>}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <ProfileCard profile={profile} />

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Ник"
          disabled={loading}
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Описание"
          disabled={loading}
        />
        <button onClick={handleSave} disabled={loading}>
          Сохранить
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;