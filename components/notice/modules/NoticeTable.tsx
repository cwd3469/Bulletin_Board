import React, { useCallback } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { NoticeInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { transTextNotice } from '@utils/transtext';
import { dateFormat } from '@utils/date';

const NoticeTable = (props: { data: NoticeInterface[] }): JSX.Element => {
  const { data } = props;
  const rows = data;
  const router = useRouter();
  const onNoticeDetail = useCallback(
    (id: string) => {
      router.push({
        pathname: `/notice/${id}`,
      });
    },
    [router],
  );
  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'id',
      headerName: '번호',
      width: 200,
    },
    {
      ...baseOption,
      field: 'type',
      headerName: '구분',
      width: 200,
      renderCell(params) {
        return <>{transTextNotice(params.row.type)}</>;
      },
    },
    {
      ...baseOption,
      field: 'title',
      headerName: '제목',
      width: 600,
      renderCell(params) {
        return (
          <Button
            sx={{
              width: '100%',
              height: '62px',
              color: '#555',
              fontWeight: '400',
            }}
            variant="text"
            onClick={() => onNoticeDetail(params.row.id)}
          >
            {params.row.title}
          </Button>
        );
      },
    },
    {
      ...baseOption,
      field: 'createdAt',
      headerName: '작성일',
      width: 190,
      renderCell(params) {
        return <>{dateFormat(params.row.createdAt).day}</>;
      },
    },
  ];

  return <WDataTable rows={rows} columns={columns} />;
};

export default NoticeTable;
