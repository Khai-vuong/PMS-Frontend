import "./Pmconsole.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  pid: string;
}

const Pmconsole: React.FC<HeaderProps> = ({ pid }) => {
  // const [tasks, setTasks] = useState();
  // const [displayMemberList, setDisplayMemberList] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [members, setMembers] = useState([] as string[]);


  const navigate = useNavigate();

  const toCreateTask = (): void => {
    navigate(`/task/create/?pid=${pid}`);
  };

  const nextPhase = (): void => {
    axios
      .post(`http://localhost:4000/projects/NextPhase/?pid=${pid}`)
      .then((response) => {
        alert("Phase changed successfully, refresh the page to see changes");
        console.log("Next phase successful:", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi chuyển sang giai đoạn tiếp theo:", error);
      });
  };

  //FOR AUTHORIZE

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedMember(selectedValue);

    alert(`Selected Member: ${selectedValue}`);
  };

  const toggleMemberList = async () => {
    if (confirm(`Are you sure you want to authorize ${selectedMember}?`)) {
      const [name] = selectedMember.split(" - ");

      axios.put(`http://localhost:4000/projects/authorize/?member=${name}&pid=${pid}`)
        .then(() => {
          alert("Member authorized successfully, refresh the page to see changes");
        })
        .catch((error) => {
          alert("Error authorizeing member: " + error);
        });
    }

    else {
      alert("Authorization cancelled");
    }
  };

  const transformToArray = (input: any): string[] => {
    const managerList = input.manager.map((name: string) => `${name} - manager`);
    const memberList = input.member.map((name: string) => `${name} - member`);

    return [...managerList, ...memberList];
  };

  const getAllMember = async (pid: string): Promise<string[]> => {
    try {
      const response = await axios.get(`http://localhost:4000/utils/member/?pid=${pid}`)

      const list = transformToArray(response.data);
      console.log("Members fetched successfully:", list);

      setMembers(list);


      return list; // Return the transformed array
    } catch (error) {
      console.error("Error fetching members:", error);
      return []; // Return an empty array if there's an error
    }
  };
  // END AUTHORIZE

  const inviteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.target as any).elements.name.value;
    axios.post(`http://localhost:4000/projects/invite/?pid=${pid}&name=${name}`)
      .then(() => {
        alert(name + " was added to project");
      })
      .catch((error) => {
        alert("Error inviting member: " + error);
      });
  }

  useEffect(() => {
    getAllMember(pid)
  }, []);



  return (
    <>
      <div className="pm-container">
        <div className="pm-buttons">
          <div className="authorize" onClick={toggleMemberList} >Authorize</div>
          <select onChange={handleChange} value={selectedMember} className="authorize-select">
            <option value="" disabled>
              Choose a member
            </option>
            {members.map((member, index) => (
              <option key={index} value={member}>
                {member}
              </option>
            ))}
          </select>

          <div className="right-buttons">
            <div className="pm-create" onClick={toCreateTask}>Create task</div>
            <div className="next-phase" onClick={nextPhase}>Next Phase</div>
            <div className="invite">
              <form onSubmit={inviteUser}>
                <input type="text" name="name" placeholder="Enter name" required />
                <button type="submit" className="invite-button">Invite</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pmconsole;
