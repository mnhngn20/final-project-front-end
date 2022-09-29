/* eslint-disable react/display-name */
import { Button, Col, Drawer, Form, FormInstance, Row } from 'antd';
import { Store } from 'rc-field-form/es/interface';
import React, { forwardRef, Ref, cloneElement } from 'react';
import { useTranslation } from 'react-i18next';

export interface FormModalProps<UpsertDto, Values = Record<string, unknown>> {
  onSubmit: (values: UpsertDto) => void;
  onClose: () => void;
  children: React.ReactElement;
  selectedItem?: Values;
  initialValues?: Values;
  name: string;
  loading: boolean;
}

export type FormModalRef = FormInstance<Store>;

export const FormModal = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  <UpsertDto extends unknown>(
    {
      onSubmit,
      onClose,
      loading,
      children,
      selectedItem,
      name,
      initialValues,
    }: FormModalProps<UpsertDto>,
    ref: Ref<FormModalRef>,
  ) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const afterVisibleChange = (value: boolean) => {
      if (!value) form.resetFields();
    };
    return (
      <Drawer
        title={selectedItem?.id ? `Update ${name}` : `Create ${name}`}
        visible={!!selectedItem}
        onClose={onClose}
        afterVisibleChange={afterVisibleChange}
        destroyOnClose
        width="560"
      >
        <Form
          onFinish={value =>
            onSubmit({
              id: initialValues?.id ? Number(initialValues?.id) : undefined,
              ...value,
            })
          }
          form={form}
          layout="vertical"
          ref={ref}
          initialValues={initialValues}
        >
          {cloneElement(children, {
            initialValues,
          })}
          <Row gutter={12} className="mt-12">
            <Col xs={12}>
              <Form.Item>
                <Button type="ghost" onClick={onClose} block size="large">
                  {t('button.cancel')}
                </Button>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={loading}
                  size="large"
                  block
                >
                  {initialValues?.id ? 'Save' : 'Create'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  },
) as <UpsertDto extends Record<string, unknown>>(
  props: FormModalProps<UpsertDto> & { ref?: Ref<FormModalRef> },
) => JSX.Element;
