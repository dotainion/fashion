import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../auth/Auth";
import { Loading } from "../components/Loading";
import { updateShippingInfo } from "../data/Database";
import { AdminNavBar } from "../layout/AdminNavBar";
import { useStore } from "../state/Store";
import { autoSave } from "../tools/AutoSave";
import { Input } from "../Widgets/Input";
import { Textarea } from "../Widgets/Textarea";


export const Settings = () =>{
    const { user } = useAuth();
    const { shippingInfo } = useStore();

    const [loading, setLoading] = useState(false);

    const pickupInfoRef = useRef();
    const pickupAddressRef = useRef();
    const dropOffInfoRef = useRef();
    const dropOffAddressRef = useRef();
    const returnPolicyRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();

    const updateShipment = async() =>{
        if (loading){
            return;
        }
        setLoading(true);
        await updateShippingInfo({
            pickup: {
                info: pickupInfoRef.current.value,
                address: pickupAddressRef.current.value
            },
            dropOff: {
                info: dropOffInfoRef.current.value,
                address: dropOffAddressRef.current.value,
            },
            media: {
                facebook: facebookRef.current.value,
                instagram: instagramRef.current.value,
            },
            policy: returnPolicyRef.current.value,
        }, user?.id);
        setLoading(false);
    }

    useEffect(()=>{
        autoSave.auto();
        if (Object.keys(shippingInfo || {}).length){
            pickupInfoRef.current.value = shippingInfo?.pickup?.info || "";
            pickupAddressRef.current.value = shippingInfo?.pickup?.address || "";
            dropOffInfoRef.current.value = shippingInfo?.dropOff?.info || "";
            dropOffAddressRef.current.value = shippingInfo?.dropOff?.address || "";
            facebookRef.current.value = shippingInfo?.media?.facebook || "";
            instagramRef.current.value = shippingInfo?.media?.instagram || "";
            returnPolicyRef.current.value = shippingInfo?.policy || "";
        }
    }, [shippingInfo]);

    return(
        <div className="settings">
            <AdminNavBar />
            <div className="centered-animate">
                <div className="data-entry-container data-entry-settings-container">
                    <div className="data-entry-sub-container">
                        <div className="data-entry-inner-container scroll">
                            <div style={{marginTop:"20px"}}>
                                <button onClick={updateShipment} className="btn pad">UPDATE</button>
                            </div>
                            <div>
                                <Textarea title="Pick up information" inputRef={pickupInfoRef} />
                                <Input title="Pick up address" inputRef={pickupAddressRef} />
                            </div>
                            <div>
                                <Textarea title="Drop off information" inputRef={dropOffInfoRef} />
                                <Input title="Drop off destination address" inputRef={dropOffAddressRef} />
                            </div>
                            <div>
                                <Textarea title="Return policies" inputRef={returnPolicyRef} />
                            </div>
                            <div>
                                <Input title="Facebook" inputRef={facebookRef} />
                                <Input title="Instagram" inputRef={instagramRef} />
                            </div>
                            <div style={{marginTop:"20px"}}>
                                <button onClick={updateShipment} className="btn pad">UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loading isOpen={loading} darkMode />
        </div>
    )
}