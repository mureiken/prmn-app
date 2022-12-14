"""empty message

Revision ID: dcef44ad9d8c
Revises: 69f398d9ab1a
Create Date: 2022-11-28 07:42:15.902564

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dcef44ad9d8c'
down_revision = '69f398d9ab1a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('partners',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('partner_name', sa.String(length=120), nullable=False),
    sa.Column('logo_image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_partners_logo_image'), 'partners', ['logo_image'], unique=False)
    op.create_index(op.f('ix_partners_partner_name'), 'partners', ['partner_name'], unique=False)
    op.create_table('publications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('publication_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_publications_publication_id'), 'publications', ['publication_id'], unique=False)
    op.drop_index('ix_posts_timestamp', table_name='posts')
    op.drop_index('ix_posts_user_id', table_name='posts')
    op.drop_table('posts')
    op.drop_table('followers')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('followers',
    sa.Column('follower_id', sa.INTEGER(), nullable=True),
    sa.Column('followed_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], )
    )
    op.create_table('posts',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('text', sa.VARCHAR(length=280), nullable=False),
    sa.Column('timestamp', sa.DATETIME(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_posts_user_id', 'posts', ['user_id'], unique=False)
    op.create_index('ix_posts_timestamp', 'posts', ['timestamp'], unique=False)
    op.drop_index(op.f('ix_publications_publication_id'), table_name='publications')
    op.drop_table('publications')
    op.drop_index(op.f('ix_partners_partner_name'), table_name='partners')
    op.drop_index(op.f('ix_partners_logo_image'), table_name='partners')
    op.drop_table('partners')
    # ### end Alembic commands ###
