import React from 'react'
import Header from '../../components/header'
import VehiclesForm from '../../components/vehiclesForm'
import DataAdress from '../../components/dataAdress'
import ClientData from '../../components/clientData'
import ObsTextArea from '../components/obsTextArea'
import MoreInfo from '../../components/moreInfo'
import ServiceTerms from '../../components/serviceTerms'
import Footer from '../../components/Footer'
import '../styles/vistoria.css'

export default function Acc() {
    return (
      <>
        <Header />
        <section className="dadosPrincipais">
          <VehiclesForm />
          <DataAdress />
          <ClientData />
          <ObsTextArea />
          <MoreInfo />
          <ServiceTerms />
        </section>
        <Footer />
      </>
    )
}