import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination";
import "./MailPage.css";
import MRbuttons from "../../components/MR-buttons/MRbuttons";
import '../../components/MR-buttons/MRbuttons.css';

interface MailDTO {
  mid: string;
  mrid: string;
  tid: string;
  content: string;
  category: string;
}

interface PageMetaDTO {
  pageCount: number;
  pageSize: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface MailPageDTO {
  data: MailDTO[];
  metadata: PageMetaDTO;
}

const MailPage: React.FC = () => {
  const [mailData, setMailData] = useState<MailPageDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState("User Name");

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  const getInitMail = async () => {
    try {
      const response = await axios.get("http://localhost:4000/mail/init");
      console.log("Mail data:", response.data);
    } catch (error) {
      console.error("Error fetching mail data:", error);
    }
  }

  const initUsername = async () => {
    try {
      const response = await axios.get("http://localhost:4000/utils/username");
      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  }


  useEffect(() => {
    getInitMail();
    initUsername();
  }, []);

  const fetchPage = async (currentPage: number) => {
    try {
      const response = await axios.get("http://localhost:4000/mail", {
        params: {
          page: currentPage,
          pageSize: 5, // Adjust page size as needed
        },
      });
      setMailData(response.data);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error("Error fetching mail data:", error);
    }
  };

  const renderItem = (mail: MailDTO) => {
    return (
      <div key={mail.mid} className="mail-item">

        <div className="category">{mail.category}</div>
        <div className="content">{mail.content}</div>
        <div className="buttons">
          {mail.category === "MergeRequest" ? (
            <MRbuttons tid={mail.tid} mrid={mail.mrid} />
          ) : 'false'}
        </div>

      </div>
    );
  };


  return (
    <div className="mail-page">
      <Header inforName={username} />
      <div className="mail-content">
        <h1>Mail Page</h1>
        {mailData ? (
          <Pagination
            ListDTO={mailData}
            fetchPage={fetchPage}
            renderItem={renderItem}
          />
        ) : (
          <p>Loading mail data...</p>
        )}
      </div>
    </div>
  );
};

export default MailPage;