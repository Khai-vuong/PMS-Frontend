
export interface PageMetaDTO {
    pageCount: number;
    pageSize: number;
    currentPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface TaskDTO {
    name: string;
    description: string;
    assignee: string;
    tid: string;
}

export interface LobbyTaskDTO<T> {
    data: T[];
    totalItems: number;
    itemsPerPage: number;
    // metadata: PageMetaDTO;
}