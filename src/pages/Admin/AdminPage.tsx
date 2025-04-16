import { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import {
  Layout,
  Drawer,
  Menu,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  Typography,
} from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { FormInstance } from "antd/es/form";

const { Header, Content } = Layout;

interface ChargingPoint {
  id: number;
  nome: string;
  endereco: string;
  tipoRecarga: string;
  status: boolean;
  horarioFuncionamento: string;
  responsavelNome: string;
  responsavelContato: string;
  createdAt: string;
  updatedAt: string;
}

type ChargingPointForm = Omit<ChargingPoint, "id" | "createdAt" | "updatedAt">;

const initialFormData: ChargingPointForm = {
  nome: "",
  endereco: "",
  tipoRecarga: "",
  status: false,
  horarioFuncionamento: "",
  responsavelNome: "",
  responsavelContato: "",
};

const getToken = (): string | null => sessionStorage.getItem("jwtToken");

async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}

export default function AdminPage() {
  const [isLogged, setIsLogged] = useState(false);
  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form] = Form.useForm<ChargingPointForm>();

  const loadChargingPoints = async (): Promise<void> => {
    console.log("→ buscando pontos com token:", getToken());
    const res = await authFetch(
      "https://api-tecsomobi.onrender.com/chargingPoints"
    );
    if (res.ok) setChargingPoints(await res.json());
    else console.error("loadChargingPoints:", res.status, await res.text());
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      authFetch("https://api-tecsomobi.onrender.com/admin/profile").then(
        (res) => {
          if (res.ok) {
            setIsLogged(true);
            loadChargingPoints();
          } else {
            console.warn("perfil retornou:", res.status);
            setIsLogged(false);
          }
        }
      );
    }
  }, []);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    const res = await fetch(
      "https://api-tecsomobi.onrender.com/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (res.ok) {
      const { token }: { token: string } = await res.json();
      console.log("→ token recebido:", token);
      sessionStorage.setItem("jwtToken", token);
      setIsLogged(true);
      loadChargingPoints();
    } else {
      console.error("login falhou:", res.status);
    }
  };

  const openNew = (): void => {
    setSelectedId(null);
    form.setFieldsValue(initialFormData);
    setModalOpen(true);
  };

  const openEdit = (record: ChargingPoint): void => {
    setSelectedId(record.id);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleSubmit = async (): Promise<void> => {
    const values = await form.validateFields();
    const url = 
      selectedId === null
        ? "https://api-tecsomobi.onrender.com/chargingPoints"
        : `https://api-tecsomobi.onrender.com/chargingPoints/${selectedId}`;
    const method = selectedId === null ? "POST" : "PUT";
    const res = await authFetch(url, {
      method,
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setModalOpen(false);
      loadChargingPoints();
    } else {
      console.error("submit falhou:", res.status, await res.text());
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    const res = await authFetch(
      `https://api-tecsomobi.onrender.com/chargingPoints/${id}`,
      { method: "DELETE" }
    );
    if (res.ok) loadChargingPoints();
    else console.error("delete falhou:", res.status);
  };

  const columns: ColumnsType<ChargingPoint> = [
    { title: "ID", dataIndex: "id" },
    { title: "Nome", dataIndex: "nome" },
    { title: "Endereço", dataIndex: "endereco" },
    { title: "Tipo de Recarga", dataIndex: "tipoRecarga" },
    {
      title: "Status",
      dataIndex: "status",
      render: (v) => (v ? "Ativo" : "Inativo"),
    },
    { title: "Horário Funcionamento", dataIndex: "horarioFuncionamento" },
    { title: "Responsável", dataIndex: "responsavelNome" },
    { title: "Contato", dataIndex: "responsavelContato" },
    {
      title: "Ações",
      render: (_,_r) => (
        <Space>
          <Button size="small" onClick={() => openEdit(_r)}>
            Editar
          </Button>
          <Button size="small" danger onClick={() => handleDelete(_r.id)}>
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  if (!isLogged) return <LoginForm onLogin={handleLogin} />;

  return (
    <Layout>
      <Header
        style={{
          background: "#175097",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: "#fff" }} />}
          onClick={() => setDrawerVisible(true)}
        />
        <Typography.Text style={{ color: "#fff", fontSize: 18 }}>
          Tabelas
        </Typography.Text>
        <img src="/logo2.png" alt="logo" style={{ height: 32 }} />
      </Header>

      <Drawer
        placement="left"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline" theme="dark" selectable={false}>
          <Menu.Item icon={<UnorderedListOutlined />}>Tabelas</Menu.Item>
          <Menu.Item
            icon={<LogoutOutlined />}
            onClick={() => {
              sessionStorage.removeItem("jwtToken");
              window.location.reload();
            }}
          >
            Sair
          </Menu.Item>
        </Menu>
      </Drawer>

      <Content style={{ margin: 16 }}>
        <Button
          type="primary"
          style={{
            background: "#FF5627",
            borderColor: "#FF5627",
            marginBottom: 16,
          }}
          onClick={openNew}
        >
          Novo Cadastro
        </Button>

        <Table<ChargingPoint>
          dataSource={chargingPoints}
          columns={columns}
          rowKey="id"
          bordered
        />

        <Modal
          title={selectedId ? "Editar Ponto de Recarga" : "Novo Ponto de Recarga"}
          open={modalOpen}
          onOk={handleSubmit}
          onCancel={() => setModalOpen(false)}
          width={600}
        >
          <Form form={form as FormInstance<ChargingPointForm>} layout="vertical">
            <Form.Item
              name="nome"
              label="Nome"
              rules={[{ required: true, message: "Informe o nome" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="endereco"
              label="Endereço"
              rules={[{ required: true, message: "Informe o endereço" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tipoRecarga"
              label="Tipo de Recarga"
              rules={[{ required: true, message: "Informe o tipo" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="horarioFuncionamento"
              label="Horário Funcionamento"
              rules={[{ required: true, message: "Informe o horário" }]}
            >
              <Input placeholder="08:00 - 18:00" />
            </Form.Item>
            <Form.Item
              name="responsavelNome"
              label="Responsável Nome"
              rules={[{ required: true, message: "Informe o responsável" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="responsavelContato"
              label="Responsável Contato"
              rules={[{ required: true, message: "Informe o contato" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status (Ativo)" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
