import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'
import { navigate } from '@reach/router'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import Title from '../Title'
import Steps from './Form/Steps'
import { useForm } from '../Form'
import { useI18n } from '../I18n'

import pages from '../Pages.module.css'
import styles from './Show.module.css'
import buttons from '../Buttons2.module.css'

Show.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string
}

export default function Show ({ id, locale }) {
  const I18n = useI18n(locale)

  const {
    cancelToken
  } = useForm()

  const [admission, setAdmission] = useState()
  const [dictionaries, setDictionaries] = useState()

  useEffect(() => {
    _fetch()
  }, [id])

  const _fetch = async () => {
    const { data } = await axios.get(`/admissions/${id}.json`)

    if (data.admission && data.admission.state !== 'done') {
      navigate(`/admissions/${id}/edit`)
    }

    setAdmission(data.admission)
    setDictionaries(data.dictionaries)
  }

  const handleAdmissionConfirm = async () => {
    await axios.post(
      `/admissions/${id}/confirm.json`
    ).then(res => {
      _fetch()

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  }

  const handlePrevClick = async e => {
    e.preventDefault()

    await axios.post(
      `/admissions/${id}/jump.json`,
      { admission: { state: admission.step_prev } },
      { cancelToken: cancelToken.current.token }
    ).then(res => {
      _fetch()
    })
  }

  if (!admission || !dictionaries) return null

  return (
    <div className={pages.beta}>
      <Title
        h1={admission && I18n.t('admissions.edit.title', { number: admission.number })}
      />

      {admission &&
        <>
          <Helmet>
            <title>{I18n.t('admissions.edit.title', { number: admission.number })}</title>
          </Helmet>

          <div className={styles.steps}>
            <div className={pages.container}>
              <Steps admission={admission} locale={locale} _fetch={_fetch} />
            </div>
          </div>
        </>
      }

      <div className={pages.container}>
        <div className={styles.root}>
          <div className={styles.form}>
            {admission.status === 'filling' &&
              <>
                <div className={styles.header}>
                  <p>
                    Шаг 11 из 11
                  </p>

                  <h3>Проверка данных</h3>
                </div>

                <div className={styles.hint}>
                  Уже почти всё, остался последний шаг. Пожалуйста, проверьте результат заполнения заявления и отправьте в приёмную комиссию на рассмотрение.
                </div>
              </>
            }

            { admission.status === 'processing' &&
              <>
                <h2>Ваша анкета принята и передана на обработку сотрудникам приёмной комиссии</h2>
                <div className={styles.hint}>
                  <p>
                    Обычно обработка анкеты занимает 1-2 рабочих дня.
                  </p>

                  <p>
                    Если вы всё заполнили верно, и у приёмной комиссии нет вопросов по вашему заявлению, то заявление считается принятым.
                  </p>

                  <p>
                    Принятые заявления появляются в <a className={styles.a} target="_blank" rel="noreferrer" href="/abitur/2020/list">списках абитуриентов</a>.
                    Найдите себя в списках, чтобы убедиться, что всё в порядке.
                    Списки обновляются 1 раз в сутки.
                  </p>

                  <p>
                    Если возникнут вопросы по документам и анкете, сотрудники приёмной комиссии позвонят или напишут вам.
                  </p>

                  <p>
                    Мы всегда на связи, задавайте нам вопросы.
                  </p>

                  <p className={styles.row}>
                    <ul>
                      <li>+7 831 416 6141</li>
                      <li>+7 930 715 5798</li>
                      <li>+7 920 047 6026</li>
                    </ul>

                    <ul>
                      <li><a className={styles.a} target="_blank" rel="noreferrer" href="https://vk.com/linguistica">группа ВКонтакте</a></li>
                      <li><a className={styles.a} target="_blank" rel="noreferrer" href="https://lunn.ru/abitur/2020">страница приёмной комиссии</a></li>
                      <li><a className={styles.a} href="mailto:priem@lunn.ru">priem@lunn.ru</a></li>
                    </ul>
                  </p>

                  <p>
                    Спасибо, что выбрали нас!
                  </p>
                </div>
              </>
            }
            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.one')}</h4>
              </div>

              <div className={styles.stepInfo}>
                <div>{I18n.t('admissions.labels.identity_first_name')}: {admission.identity_first_name}</div>
                <div>{I18n.t('admissions.labels.identity_last_name')}: {admission.identity_last_name}</div>
                <div>{I18n.t('admissions.labels.identity_middle_name')}: {admission.identity_middle_name}</div>
                <div>{I18n.t('admissions.labels.identity_sex')}: {I18n.t(`admissions.options.identity_sex.${admission.identity_sex}`)}</div>
                <div>{I18n.t('admissions.labels.identity_birth_date')}: {dayjs(admission.identity_birth_date).format('DD.MM.YYYY')}</div>
                <div>{I18n.t('admissions.labels.identity_birth_place')}: {admission.identity_birth_place}</div>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.two')}</h4>
              </div>

              <div className={styles.stepInfo}>
                <div>{I18n.t('admissions.labels.document_nationality')}: {dictionaries.citizenships.find(c => c.id === admission.document_nationality).label}</div>
                <div>{I18n.t('admissions.labels.document_type')}: {I18n.t(`admissions.options.document_type.${admission.document_type}`)}</div>
                <div>{I18n.t('admissions.labels.document_series')}: {admission.document_series}</div>
                <div>{I18n.t('admissions.labels.document_number')}: {admission.document_number}</div>
                <div>{I18n.t('admissions.labels.document_issued_by')}: {admission.document_issued_by}</div>
                <div>{I18n.t('admissions.labels.document_issue_date')}: {dayjs(admission.document_issue_date).format('DD.MM.YYYY')}</div>

                <Documents documents={admission.documents.filter(d => d.section === 'document')} locale={locale}/>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.three')}</h4>
              </div>

              <div className={styles.stepInfo}>
                <div>{I18n.t('admissions.labels.parents_relation_degree')}: {I18n.t(`admissions.options.parents_relation_degree.${admission.parents_relation_degree_first}`)}</div>
                <div>{I18n.t('admissions.labels.parents_name')}: {admission.parents_name_first}</div>
                <div>{I18n.t('admissions.labels.parents_phone')}: {admission.parents_phone_first}</div>
                {admission.parents_relation_degree_second &&
                  <>
                    <div>{I18n.t('admissions.labels.parents_relation_degree')}: {I18n.t(`admissions.options.parents_relation_degree.${admission.parents_relation_degree_second}`)}</div>
                    <div>{I18n.t('admissions.labels.parents_name')}: {admission.parents_name_second}</div>
                    <div>{I18n.t('admissions.labels.parents_phone')}: {admission.parents_phone_second}</div>
                  </>
                }
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.four')}</h4>
              </div>

              <div className={styles.stepInfo}>
                <div>{I18n.t('admissions.labels.address_country')}: {admission.address_country}</div>
                <div>{I18n.t('admissions.labels.address_region')}: {admission.address_region}</div>
                {admission.address_district &&
                  <div>{I18n.t('admissions.labels.address_district')}: {admission.address_district}</div>
                }
                {admission.address_city &&
                  <div>{I18n.t('admissions.labels.address_city')}: {admission.address_city}</div>
                }
                {admission.address_locality &&
                  <div>{I18n.t('admissions.labels.address_locality')}: {admission.address_locality}</div>
                }
                <div>{I18n.t('admissions.labels.address_index')}: {admission.address_index}</div>
                <div>{I18n.t('admissions.labels.address_street')}: {admission.address_street}</div>
                <div>{I18n.t('admissions.labels.address_house')}: {admission.address_house}</div>
                {admission.address_building &&
                  <div>{I18n.t('admissions.labels.address_building')}: {admission.address_building}</div>
                }
                {admission.address_apartment &&
                  <div>{I18n.t('admissions.labels.address_apartment')}: {admission.address_apartment}</div>
                }
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.five')}</h4>
              </div>

              <div className={styles.stepInfo}>
                <div>{I18n.t('admissions.labels.address_country')}: {admission.residence_country}</div>
                <div>{I18n.t('admissions.labels.address_region')}: {admission.residence_region}</div>
                {admission.residence_district &&
                  <div>{I18n.t('admissions.labels.address_district')}: {admission.residence_district}</div>
                }
                {admission.residence_city &&
                  <div>{I18n.t('admissions.labels.address_city')}: {admission.residence_city}</div>
                }
                {admission.residence_locality &&
                  <div>{I18n.t('admissions.labels.address_locality')}: {admission.residence_locality}</div>
                }
                <div>{I18n.t('admissions.labels.address_index')}: {admission.residence_index}</div>
                <div>{I18n.t('admissions.labels.address_street')}: {admission.residence_street}</div>
                <div>{I18n.t('admissions.labels.address_house')}: {admission.residence_house}</div>
                {admission.residence_building &&
                  <div>{I18n.t('admissions.labels.address_building')}: {admission.residence_building}</div>
                }
                {admission.residence_apartment &&
                  <div>{I18n.t('admissions.labels.address_apartment')}: {admission.residence_apartment}</div>
                }
                <div>{I18n.t('admissions.labels.address_mobile')}: {admission.residence_mobile}</div>
                {admission.residence_phone &&
                  <div>{I18n.t('admissions.labels.address_phone')}: {admission.residence_phone}</div>
                }
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.six')}</h4>
              </div>

              <div className={styles.stepInfo}>
                <div>{I18n.t('admissions.labels.school_type')}: {I18n.t(`admissions.options.school_type.${admission.school_type}`)}</div>
                <div>{I18n.t('admissions.labels.school_name')}: {admission.school_name}</div>
                <div>{I18n.t('admissions.labels.school_graduation')}: {admission.school_graduation}</div>
                <div>{I18n.t('admissions.labels.school_address')}: {admission.school_address}</div>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.seven')}</h4>
              </div>

              <div className={styles.stepInfo}>
                <div>{I18n.t('admissions.labels.school_education')}: {I18n.t(`admissions.options.school_education.${admission.school_education}`)}</div>
                <div>{I18n.t('admissions.labels.school_document_type')}: {I18n.t(`admissions.options.school_document_type.${admission.school_document_type}`)}</div>
                <div>{I18n.t('admissions.labels.school_document_number')}: {admission.school_document_number}</div>
                <div>{I18n.t('admissions.labels.school_document_date')}: {dayjs(admission.school_document_date).format('DD.MM.YYYY')}</div>
                {admission.school_diploma_type &&
                  <div>{I18n.t('admissions.labels.school_diploma_type')}: {I18n.t(`admissions.options.school_diploma_type.${admission.school_diploma_type}`)}</div>
                }

                <Documents documents={admission.documents.filter(d => d.section === 'school')} locale={locale}/>

                {admission.school_merit &&
                  <div>{I18n.t('admissions.labels.school_merit')}: {I18n.t(`admissions.options.school_merit.${admission.school_merit}`)}</div>
                }
                <div>{I18n.t('admissions.labels.school_language')}: {I18n.t(`admissions.options.school_language.${admission.school_language}`)}</div>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.eight')}</h4>
              </div>

              <div className={styles.stepInfo}>
                {admission.subjects && admission.subjects.map((subject, _) =>
                  <React.Fragment key={_}>
                    <div>{I18n.t('admissions.labels.score_subject')}: {I18n.t(`admissions.options.subjects.${subject.subject}`)}</div>
                    {subject.ege !== '' &&
                      <div>{I18n.t('admissions.labels.score_ege')}: {subject.ege}</div>
                    }

                    {subject.grade !== '' &&
                      <div>{I18n.t('admissions.labels.score_grade')}: {subject.grade}</div>
                    }

                    {subject.year !== '' &&
                      <div>{I18n.t('admissions.labels.score_year')}: {subject.year}</div>
                    }
                    <br />
                  </React.Fragment>
                )}

                {admission.course_olympiad !== '' &&
                  <div>{I18n.t('admissions.labels.course_olympiad')}: {I18n.t(`admissions.options.course_olympiad.${admission.course_olympiad}`)}</div>
                }

                <Documents documents={admission.documents.filter(d => d.section === 'olympiad')} locale={locale}/>

                <div>{I18n.t('admissions.labels.score_achievements')}: {dictionaries.achievements.filter(a => admission.score_achievements.includes(a.id)).map(a => a.label).join(', ')}</div>

                <Documents documents={admission.documents.filter(d => d.section === 'achievements')} locale={locale}/>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <h4>{I18n.t('admissions.steps.nine')}</h4>
              </div>

              <div className={styles.stepInfo}>
                {admission.subjects && admission.directions.map((direction, _) =>
                  <React.Fragment key={_}>
                    <div>{I18n.t('admissions.labels.course_direction')}: {dictionaries.directions.find(d => d.id === direction.course_id).label}</div>
                    <div>{I18n.t('admissions.labels.course_form')}: {I18n.t(`admissions.options.course_form.${direction.form}`)}</div>
                    <div>{I18n.t('admissions.labels.course_basis')}: {I18n.t(`admissions.options.course_basis.${direction.basis}`)}</div>
                    <br />
                  </React.Fragment>
                )}

                {admission.course_contract !== '' &&
                  <div>{I18n.t('admissions.labels.course_contract')}: Да</div>
                }

                {admission.course_status !== '' &&
                  <div>{I18n.t('admissions.labels.course_status')}: {I18n.t(`admissions.options.course_status.${admission.course_status}`)}</div>
                }

                {admission.course_military !== '' &&
                  <div>{I18n.t('admissions.labels.course_military')}: Да</div>
                }

                {admission.course_study !== '' &&
                  <div>{I18n.t('admissions.labels.course_study')}: Да</div>
                }

                <Documents documents={admission.documents.filter(d => d.section === 'spec')} locale={locale}/>
              </div>
            </div>

            {admission.state === 'done' && admission.status === 'filling' &&
              <div className={styles.actions}>
                <div className={styles.prev}>
                  <span onClick={handlePrevClick}>
                    Назад
                  </span>
                </div>

                <button className={classNames(buttons.main, buttons.big, styles.send)} onClick={() => handleAdmissionConfirm()}>Отправить заявление</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

Documents.propTypes = {
  documents: PropTypes.array,
  locale: PropTypes.string
}

function Documents ({ documents, locale }) {
  const I18n = useI18n(locale)

  if (!documents || documents.length < 1) return null

  return (
    <div className={styles.documents}>
      <strong>
        {I18n.t(`admissions.documents.section.${documents[0].section}`)}
      </strong>

      <ol className={styles.ol}>
        {documents.map(doc =>
          <li key={doc.id} className={styles.document}>
            <a className={styles.a} href={doc.file_url} target="_blank" rel="noreferrer"> {doc.title}</a>
          </li>
        )}
      </ol>
    </div>
  )
}
