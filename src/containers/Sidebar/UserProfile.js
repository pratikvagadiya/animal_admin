import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";
import { put } from "@redux-saga/core/effects";
import { showAuthMessage } from "../../appRedux/actions/Auth";
import { GetCurrentLoggedUserDetails } from "../../hooks/AuthHooks";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>
        <Link to="/companyprofile"> Company Profile</Link>
      </li>
      <li onClick={() => dispatch(userSignOut())}>Logout
      </li>
    </ul>
  );


  useEffect(() => {
    profilefetch()
    img()
  }, []);

  const profilefetch = async () => {
    let userprofile = await GetCurrentLoggedUserDetails();
    if (userprofile.response_code === "FAILED") {
      put(showAuthMessage(userprofile.message));
    } else {
      console.log(userprofile);
      setprofile(userprofile)
    }
  }
  const [profile, setprofile] = useState({})
  const [profileimg, setProfileimg] = useState('')
  const img = () => {
    var data = [
      'https://avatars.githubusercontent.com/u/87601568?v=4',
      'https://i.pinimg.com/originals/61/fd/1c/61fd1cc8e5178dedceade1c3da05e45a.jpg',
      'https://pics.me.me/thumb_funny-avatar-mr-bean-2778088.png',
      'https://i.redd.it/klqhr8wqmgo31.jpg',
      'https://forums.cubecraftcdn.com/xenforo/data/avatars/o/578/578121.jpg',
      'https://s3.amazonaws.com/kmpz-p/images/i509728-1383698697750786442.jpg',
      'https://meragor.com/files/styles//ava_800_800_wm/standoff_155.jpg',
      'https://i1.sndcdn.com/avatars-000704629498-olpglu-t500x500.jpg',
      'https://pm1.narvii.com/5751/3d2309125d7bb9e8d7f35bce5cde273326f999c4_hq.jpg',
      'https://avatarfiles.alphacoders.com/548/54800.jpg',
      'https://avatarfiles.alphacoders.com/301/thumb-301210.png',
      'https://avatarfiles.alphacoders.com/142/thumb-142168.jpg',
      'https://i1.sndcdn.com/avatars-zWoYvzsYDQ9DjyqV-SX8RLw-t500x500.jpg',
      'https://www.meme-arsenal.com/memes/ecd887691ef41bffdfa6149c2524d843.jpg',
      'https://www.meme-arsenal.com/memes/fae3dd67d5208ca1b7ba1b4b8a1745b6.jpg',
      'https://pngimage.net/wp-content/uploads/2018/06/funny-csgo-png-6.png',
      'https://spic.one/wp-content/uploads/2018/07/2a96cc8f1f68a0e2ee88.jpg',
      'https://thumbs.dreamstime.com/b/funny-cartoon-mons…tor-halloween-monster-square-avatar-175918631.jpg',
      'https://i.pinimg.com/736x/fc/b7/72/fcb772b02af4339b3abebf9dc761ec6a.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_oAlf6eD-4mrGrbTaWeg2Ec17AhQLgfuYBQ&usqp=CAU',
      'https://www.christophniemann.com/media/2016/04/kiaFeb_B_erase002-1-810x956.jpg',
      'https://www.websplashers.com/wp-content/uploads/2021/08/Whatsapp-Dp-Download2.jpg',
      'https://w7.pngwing.com/pngs/586/929/png-transparent-computer-software-tax-unique-user-income-page-view-color-woman-white-face-monochrome.png'
    ]
    var item = data[Math.floor(Math.random() * data.length)];
    setProfileimg(item)
  }
  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <a target="_blank" href={profileimg}>
        <Avatar
          src={profileimg}
          className="gx-size-40 gx-pointer gx-mr-3"
          alt="" />
      </a>
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <span className="gx-avatar-name">{profile.username}<i
          className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /></span>
      </Popover>
    </div>

  )
};

export default UserProfile;
