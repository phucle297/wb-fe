import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import styles from "./index.module.scss";

const Home = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={styles.wrapper}>
      <h1>Home</h1>
      <button>ChangeTheme</button>

      <Modal opened={opened} title="Authentication" onClose={close}>
        {/* Modal content */}
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </div>
  );
};

export default Home;
