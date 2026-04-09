import styles from "./style.module.css";

const notifications = [
  { type: "success", text: "Patient status updated to stable", time: "10 hrs ago" },
  { type: "info", text: "Patient status updated to Improving", time: "21 hrs ago" },
  { type: "danger", text: "Patient condition is critical", time: "1 day ago" },
];

const DoctorNotificationsPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Notifications</h1>
        <span className={styles.badge}>0 New</span>
      </div>

      <div className={styles.list}>
        {notifications.map((n, i) => (
          <div key={i} className={`${styles.card} ${styles[n.type]}`}>
            <p>{n.text}</p>
            <span>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { DoctorNotificationsPage };