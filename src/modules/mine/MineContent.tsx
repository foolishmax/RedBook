import Empty from '../../components/Empty';

import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';
import icon_no_note from '../../assets/icon_no_note.webp';

interface MineContentProps {
  tab: number;
}

const EMPTY_CONFIG = [
  {
    icon: icon_no_note,
    tips: '快去发布今日的好心情吧～',
  },
  {
    icon: icon_no_collection,
    tips: '快去收藏你喜欢的作品吧～',
  },
  {
    icon: icon_no_favorate,
    tips: '喜欢点赞的人运气不会太差哦～',
  },
];

export default function MineContent(props: MineContentProps) {
  const {tab} = props;
  const data = EMPTY_CONFIG[tab];

  return <Empty icon={data.icon} tips={data.tips} />;
}
