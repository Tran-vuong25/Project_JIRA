import React, { useEffect, useRef, useState } from "react";
import css from "./projectManagement.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  AutoComplete,
  Avatar,
  Button,
  Input,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import { openDrawer } from "../../redux/drawer-slice";
import { EditIcon } from "../../assets/icons/edit.icon";
import {
  deleteProject,
  getAllProject,
  removeUserFromProject,
} from "../../services/project.service";
import { setListProject } from "../../redux/project-slice";
import { DeleteIcon } from "../../assets/icons/delete.icon";
import { setListUserSearch } from "../../redux/user-slice";
import { assignUserProject, getUser } from "../../services/user.service";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hook-redux";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export function ProjectManagement() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [value, setValue] = useState("");
  const searchInput = useRef(null);

  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const data = useAppSelector((state) => {
    return state.projectReducer.listProject;
  });


  useEffect(() => {
    const getListProject = async () => {
      const resp = await getAllProject();

      const action = setListProject(resp.content);

      dispatch(action);
    };
    getListProject();
  }, [data]);

  const searchResult = useAppSelector((state) => {
    return state.userReducer.listUserSearch;
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",      
      width: "20%",

      render: (text, record, index) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            to={`/projectDetail/${record.id}`}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: "Category name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "15%",

      ...getColumnSearchProps("categoryName"),
    },
    {
      title: "Creator",
      key: "creator",
      width: "17%",

      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLocaleLowerCase();
        let creator2 = item2.creator?.name.trim().toLocaleLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      key: "members",
      width: "20%",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="bottom"
                  title="Members"
                >
                  <Avatar style={{width: "3rem", height: "3rem"}} key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="rightTop"
              title={() => {
                return <span>Add user</span>;
              }}
              content={() => {
                return (
                  <AutoComplete
                    options={searchResult?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);
                      const data = {
                        projectId: record.id,
                        userId: valueSelect,
                      };
                      assignUserProject(data)
                        .then((resp) => {
                          (async () => {
                            const resp = await getAllProject();
                            dispatch(setListProject(resp.content));
                            setValue("");
                          })();
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      (async () => {
                        const resp = await getUser(value);
                        const action = setListUserSearch(resp.content);
                        dispatch(action);
                      })();
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%", width: "3.5rem", height: "3.5rem" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return (
          <div>
            <button
              onClick={() => {
                const action = {
                  id: record.id,
                  projectName: record.projectName,
                  creator: record.creator.id,
                  description: record.description,
                  categoryId: record.categoryId,
                };

                dispatch(openDrawer(action));
              }}
              className="btn me-2 btn-primary"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => {
                deleteProject(record.id)
                  .then(() => {
                    (async () => {
                      const resp = await getAllProject();
                      dispatch(setListProject(resp.content));
                    })();
                    alert("Delete project successfully!");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
              className="btn btn-danger"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ width: "80%" }}>
      <div style={{width: "100rem"}}>
        <h1>Project Management</h1>
        <Table rowKey="Id" columns={columns} dataSource={data}/>
      </div>
    </div>
  );
}
