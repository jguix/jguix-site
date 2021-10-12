import classes from './FollowButton.module.css';

export const FollowButton = () => {
  return (
    <a href="/newsletter">
      <div className={classes.button}>Follow</div>
    </a>
  );
};
