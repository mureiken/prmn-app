"""empty message

Revision ID: f6e84a816e2c
Revises: dcef44ad9d8c
Create Date: 2022-11-28 07:45:19.454954

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6e84a816e2c'
down_revision = 'dcef44ad9d8c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('donors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('donor_name', sa.String(length=120), nullable=False),
    sa.Column('logo_image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_donors_donor_name'), 'donors', ['donor_name'], unique=False)
    op.create_index(op.f('ix_donors_logo_image'), 'donors', ['logo_image'], unique=False)
    op.drop_index('ix_partners_logo_image', table_name='partners')
    op.drop_index('ix_partners_partner_name', table_name='partners')
    op.drop_table('partners')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('partners',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('partner_name', sa.VARCHAR(length=120), nullable=False),
    sa.Column('logo_image', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_partners_partner_name', 'partners', ['partner_name'], unique=False)
    op.create_index('ix_partners_logo_image', 'partners', ['logo_image'], unique=False)
    op.drop_index(op.f('ix_donors_logo_image'), table_name='donors')
    op.drop_index(op.f('ix_donors_donor_name'), table_name='donors')
    op.drop_table('donors')
    # ### end Alembic commands ###