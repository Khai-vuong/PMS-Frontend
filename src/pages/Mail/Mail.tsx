import React from "react";
import "./Mail.css";
import { useState, useEffect } from "react";
// import axios from "axios";
import { MailDto } from "../../../DTOs/mail.dto"
import MRbuttons from "../../components/MR-buttons/MRbuttons";
import Header from "../../components/Header/Header";

const Mail: React.FC = () => {
  const [mails, setMails] = useState<MailDto[]>([]);
  const [username] = useState("User Name");
  useEffect(() => {
    const mockMails: MailDto[] = [
      {
        mid: "1",
        content: "This is the first mock mail content.",
        category: "MR",
        tid: "T1",
        mrid: "MR1"
      },
      {
        mid: "2",
        content: "This is the second mock mail content.",
        category: 'Authorize',
        tid: "T2",
        mrid: "MR2"
      }
    ];
    setMails(mockMails);
  }, []);

  return (
    <>
      <Header inforName={username} />
      <div className="mail-container">

        {mails.length === 0 ? (

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Không có mail nào
          </div>
        ) : (

          mails.map((mail) => (
            <form key={mail.mid} className="mail-form">
              <div className="mail-content">
                <label htmlFor={`content-${mail.mid}`}>Mail Content:</label>
                <textarea
                  id={`content-${mail.mid}`}
                  value={mail.content || ""}
                  readOnly
                  rows={10}
                  cols={50}
                />
              </div>


              {mail.category === "MR" && (
                <div className="mr-buttons-container">
                  <MRbuttons tid={mail.tid || ""} mrid={mail.mrid || ""} />
                </div>
              )}
            </form>
          ))
        )}
      </div>
    </>
  );
};



export default Mail;