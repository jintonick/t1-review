import React, { useState } from "react";
import { Card, Button, Input, Pagination } from "antd";

const { TextArea } = Input;

type Artifact = {
    id: number;
    title: string;
    reviewerName: string;
    date: string;
    comment: string;
};

const Artifacts: React.FC = () => {
  const sampleArtifacts: Artifact[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Встреча ${index + 1}`,
    reviewerName: `Ревьювер ${index + 1}`,
    date: `2023-10-${(index % 30) + 1}`,
    comment: "",
  }));

  const [artifacts, setArtifacts] = useState<Artifact[]>(sampleArtifacts);
  const [expandedArtifactId, setExpandedArtifactId] = useState<number | null>(null);
  const [editedComments, setEditedComments] = useState<{ [key: number]: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 7;
  const toggleExpand = (id: number) => {
    if (expandedArtifactId === id) {
      setExpandedArtifactId(null);
    } else {
      setExpandedArtifactId(id);
      const artifact = artifacts.find((artifact) => artifact.id === id);
      setEditedComments({
        ...editedComments,
        [id]: artifact?.comment || "",
      });
    }
  };

  const handleCommentChange = (id: number, value: string) => {
    setEditedComments({
      ...editedComments,
      [id]: value,
    });
  };

  const handleSave = (id: number) => {
    setArtifacts(
      artifacts.map((artifact) =>
        artifact.id === id
          ? { ...artifact, comment: editedComments[id] }
          : artifact
      )
    );
    setExpandedArtifactId(null);
  };

  const handleCancel = (id: number) => {
    const artifact = artifacts.find((artifact) => artifact.id === id);
    setEditedComments({
      ...editedComments,
      [id]: artifact?.comment || "",
    });
    setExpandedArtifactId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const currentArtifacts = artifacts.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-full p-[20px]">
      <div className="flex justify-center">
        <h1 className='text-[24px] font-bold my-[20px]'>Артефакты</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className='w-[1000px]'>
          <div className="justify-start gap-[130px] flex w-full pl-[16px]">
            <strong>Название встречи:</strong>
            <strong>Имя ревьювера:</strong>
            <strong className="ml-[20px]">Дата:</strong>
          </div>
        </div>
        <div className="min-h-[600px]">
          {currentArtifacts.map((artifact) => (
            <Card
              key={artifact.id}
              style={{ marginBottom: 16, width:1000 }}
              bodyStyle={{ padding: 16 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className='flex gap-[200px] items-center'>
                  <p>
                    {artifact.title}
                  </p>
                  <p className='ml-[10px]'>
                    {artifact.reviewerName}
                  </p>
                  <p>
                    {artifact.date}
                  </p>
                </div>
                <Button type='text' onClick={() => toggleExpand(artifact.id)}>
                              Оставить комментарий
                </Button>
              </div>
              {expandedArtifactId === artifact.id && (
                <div style={{ marginTop: 16 }}>
                  <TextArea
                    rows={4}
                    value={editedComments[artifact.id] || ""}
                    onChange={(e) =>
                      handleCommentChange(artifact.id, e.target.value)
                    }
                    placeholder="Введите ваш комментарий"
                  />
                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      type="primary"
                      className="shadow-none border-none bg-[#00AAE6]"
                      onClick={() => handleSave(artifact.id)}
                      style={{ marginRight: 8 }}
                    >
                        Сохранить
                    </Button>
                    <Button
                      onClick={() => handleCancel(artifact.id)}
                      className="shadow-none border-none bg-[#C55F5F] text-white"
                    >
                        Отменить изменения
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={artifacts.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Artifacts;

