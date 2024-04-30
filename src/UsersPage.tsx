import { useState } from "react";

interface User {
  name: string;
  following: Set<string>;
  followers: Set<string>;
}

const UsersPage = () => {
  const initialUsers: User[] = [
    { name: "Jeremy", followers: new Set(), following: new Set() },
    { name: "Teddy", followers: new Set(), following: new Set() },
  ];
  const initialUsernames = new Set(["Jeremy", "Teddy"]);

  const [newUser, setNewUser] = useState("");
  const [newFollower, setNewFollower] = useState("");
  const [followingUser, setFollowingUser] = useState("");
  const [usernames, setUsernames] = useState<Set<string>>(initialUsernames);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (usernames.has(newUser)) {
        alert("User already exists");
      } else {
        setUsernames((prev) => new Set([...prev, newUser]));
        setNewUser("");
        setUsers((prev) => [
          ...prev,
          { name: newUser, followers: new Set(), following: new Set() },
        ]);
      }
    }
  };

  const clearInputs = () => {
    setNewFollower("");
    setFollowingUser("");
  };

  const handleSubmit = () => {
    if (!usernames.has(newFollower)) {
      alert("Follower does not exist. Add user!!");
      return;
    }
    if (!usernames.has(followingUser)) {
      alert("User to follow does not exist. Add user!!");
      return;
    }
    if (newFollower === followingUser) {
      alert("Can't follow yourself!!");
      return;
    }
    const userToFollow = users.find((x) => x.name === followingUser);
    if (userToFollow?.followers.has(newFollower)) {
      clearInputs();
      alert(`${newFollower} is already following ${followingUser}!!`);
      return;
    } else {
      setUsers((prev) =>
        prev.map((user) => {
          if (user.name === followingUser) {
            return {
              ...user,
              followers: new Set([...user.followers, newFollower]),
            };
          } else if (user.name === newFollower) {
            return {
              ...user,
              following: new Set([...user.following, followingUser]),
            };
          }

          return user;
        })
      );
      clearInputs();
      alert(`${newFollower} is now following ${followingUser}!!`);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-3/4">
      <input
        type="text"
        className="border-white border-2 rounded-lg w-80 text-black"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value.trim())}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold">UserList</h2>
        <div className="flex flex-col gap-2 items-center justify-center">
          {users.map((user) => (
            <button
              onClick={() =>
                alert(
                  `${user.name} has ${user.followers.size} followers and is following ${user.following.size} people`
                )
              }
              key={user.name}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
      <form
        className="flex gap-3 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className="border-white border-2 rounded-lg w-80 text-black"
          value={newFollower}
          onChange={(e) => setNewFollower(e.target.value.trim())}
        />
        <span>will now follow</span>
        <input
          type="text"
          className="border-white border-2 rounded-lg w-80 text-black"
          value={followingUser}
          onChange={(e) => setFollowingUser(e.target.value.trim())}
        />
        <button
          type="submit"
          className="border-white border-2 px-3 rounded-md "
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default UsersPage;
