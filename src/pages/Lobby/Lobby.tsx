import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import axios from 'axios';

import Header from '../../components/Header/Header';
import Pmconsole from '../../components/PMconsole/Pmconsole';
import Pagination from '../../components/Pagination';
import './Lobby.css';
import { LobbyUserDTO } from '../../DTOs/LobbyUser.dto';
import { LobbyProjectDTO } from '../../DTOs/LobbyProject.dto';
import { LobbyTaskDTO, TaskDTO } from '../../DTOs/LobbyTask.dto';

const Lobby: React.FC = () => {
    const [searchParams] = useSearchParams();

    const [pid] = useState(searchParams.get("pid"));
    const [userData, setUserData] = useState<LobbyUserDTO | null>(null);
    const [projectData, setProjectData] = useState<LobbyProjectDTO | null>(null);
    const [taskData, setTaskData] = useState<LobbyTaskDTO<TaskDTO> | null>(null);

    //Get initial data
    useEffect(() => {
        const pid = searchParams.get("pid");

        axios.get(`http://localhost:4000/lobby/init/?pid=${pid}`) // lobby/init Query pid
            .then(response => {

                const { username, role } = response.data;
                setUserData({ username, role });

                const { pname, pdescription, pmodel, pphase } = response.data;
                setProjectData({ pname, pdescription, pmodel, pphase });

                //Continue work here
                const tasks = response.data.PageDTO.data;

                alert(JSON.stringify(tasks));
                const totalItems = tasks.length;
                const itemsPerPage = response.data.PageDTO.metadata.pageSize;

                const taskPageDto = {
                    'totalItems' : totalItems,
                    'itemsPerPage' : itemsPerPage,
                    'data' : tasks
                };
                setTaskData(taskPageDto);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const fetchPage = async (currentPage: number) => {
        try {
            const response = await axios.get(`http://localhost:4000/lobby/tasks/?pid=${pid}&page=${currentPage}&pageSize=5`);
            const taskList = {
                totalItems: response.data.data.length,
                itemsPerPage: response.data.metadata.pageSize,
                data: response.data.data
            }
            setTaskData(taskList);
            

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const renderItem = (item: TaskDTO) => {
        return (
            <div> {item.name}    {item.description}        {item.assignee}</div>
        );
    };

    const keySelector = (item: TaskDTO) => {
        return item.tid;
    };

    const pullAllCode = () => {
        if (confirm('This will pull all files from this project, are you sure?')) {
            alert('Pulling code is in progress');
        }
        else {
            alert('Pulling code is canceled');
        }
    };

    return (
        <>
            <div className="entire-lobby">
                <div className="header-lobby">
                    <Header inforName={userData?.username || ''} />
                </div>
                <div className="body-lobby">
                    <div className="sidebar-lobby">
                        <h1>{projectData?.pname}</h1>
                        <h3>{projectData?.pdescription}</h3>
                    </div>
                    <div className="maincontent-lobby">

                        {userData?.role === "Project Manager" && (
                            <div className="pm-console-lobby">
                                <Pmconsole pid={pid || ''} />
                            </div>
                        )}
                        <div className="filezone-lobby">
                            <h1>filezone</h1>
                            <button onClick={pullAllCode}>Pull the code</button>
                        </div>
                        <div className="tasklist-lobby">
                            <h1>tasklist</h1>
                            <Pagination ListDTO={taskData || {totalItems: 0, itemsPerPage: 0, data: []}} 
                                        fetchPage={fetchPage}
                                        renderItem={renderItem}
                                        keySelector={keySelector}/>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Lobby;